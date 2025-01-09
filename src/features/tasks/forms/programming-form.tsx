import { zodResolver } from "@hookform/resolvers/zod";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { produce } from "immer";
import { PlusIcon, Trash } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

import { File as FileType, InputStep, Testcase } from "@/api";
import CheckboxField from "@/components/form/fields/checkbox-field";
import NumberField from "@/components/form/fields/number-field";
import SelectField from "@/components/form/fields/select-field";
import TextField from "@/components/form/fields/text-field";
import FormSection from "@/components/form/form-section";
import NodeInput from "@/components/node-graph/components/step/node-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FileEditor from "@/features/problems/components/tasks/file-editor";
import {
  GraphAction,
  graphReducer,
} from "@/features/problems/components/tasks/graph-context";
import TestcaseNodeGraph from "@/features/problems/components/tasks/node-graph";

const fileSchema = z.object({
  name: z.string(),
  content: z.string(),
});

const requiredInputSchema = z.object({
  id: z.string(),
  data: z.union([z.string(), z.number(), z.boolean(), fileSchema]),
});

const programmingFormSchema = z.object({
  // TODO: fix this once we have more than one option
  question: z.string().min(1, "Question cannot be empty"),
  // there is some weird bug that makes autograde undefined sometimes
  autograde: z.boolean().transform((val) => Boolean(val)),
  environment: z.object({
    language: z.literal("PYTHON"),
    options: z.object({
      version: z.string(),
    }),
    time_limit_secs: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val)),
    memory_limit_mb: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val)),
  }),
  required_inputs: z.array(requiredInputSchema),
  // TODO: no validation here
  testcases: z.array(z.custom<Testcase>(() => true)),
});

export type ProgrammingFormType = z.infer<typeof programmingFormSchema>;

const programmingFormDefault = {
  question: "",
  autograde: true,
  environment: {
    language: "PYTHON" as const,
    options: {
      version: "3.11.9",
    },
    time_limit_secs: 1,
    memory_limit_mb: 256,
  },
  required_inputs: [],
  testcases: [],
};

type OwnProps = {
  initialValue?: ProgrammingFormType;
  onSubmit: SubmitHandler<ProgrammingFormType>;
};

const ProgrammingForm: React.FC<OwnProps> = ({ initialValue, onSubmit }) => {
  const form = useForm<ProgrammingFormType>({
    resolver: zodResolver(programmingFormSchema),
    defaultValues: initialValue ?? programmingFormDefault,
  });

  const addTestcase = () => {
    form.setValue("testcases", [
      ...form.watch("testcases"),
      {
        id: Math.max(...form.watch("testcases").map((t) => t.id), -1) + 1,
        nodes: [],
        edges: [],
      },
    ]);
  };

  const userInputNode: InputStep = {
    id: 0,
    type: "INPUT_STEP",
    inputs: [],
    outputs: form.getValues("required_inputs"),
  };

  const addRequiredInput = () => {
    let uniqueId = "DATA.TEMP";
    let i = 0;
    while (
      form.watch().required_inputs.some((input) => input.id === uniqueId)
    ) {
      uniqueId = `DATA.TEMP${i}`;
      i++;
    }
    form.setValue("required_inputs", [
      ...form.watch().required_inputs,
      {
        id: uniqueId,
        data: {
          name: `file${form.watch("required_inputs").length}.py`,
          content: "def some_function():\n\tpass",
        },
      },
    ]);
  };

  const onUpdateFileName = useDebouncedCallback(
    (index: number, newName: string) => {
      form.setValue(
        "required_inputs",
        form.watch("required_inputs").map((input, i) =>
          i === index
            ? {
                ...input,
                data: { ...(input.data as FileType), name: newName },
              }
            : input,
        ),
      );
    },
    1000,
  );

  const onUpdateFileContent = useDebouncedCallback(
    (index: number, newContent: string) => {
      form.setValue(
        "required_inputs",
        form.watch("required_inputs").map((input, i) =>
          i === index
            ? {
                ...input,
                data: { ...(input.data as FileType), content: newContent },
              }
            : input,
        ),
      );
    },
    1000,
  );

  return (
    <div className="flex w-full flex-col gap-8 px-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">New programming task</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormSection title="Task details">
            <TextField label="Question" name="question" />
          </FormSection>
          <hr />
          <FormSection title="Autograde?">
            <CheckboxField label="" name="autograde" className="mt-2" />
          </FormSection>
          <hr />
          <FormSection title="Environment">
            <div className="flex gap-4">
              <SelectField
                label="Language"
                name="environment.language"
                options={[{ label: "Python", value: "PYTHON" }]}
                disabled
              />
              <SelectField
                label="Version"
                name="environment.options.version"
                options={[{ label: "3.11.9", value: "3.11.9" }]}
                disabled
              />
            </div>
            <div className="flex gap-4">
              <NumberField
                label="Time limit (seconds)"
                name="environment.time_limit_secs"
              />
              <NumberField
                label="Memory limit (MB)"
                name="environment.memory_limit_mb"
              />
            </div>
          </FormSection>
          <hr />
          <FormSection title="Required inputs">
            <div className="flex flex-col items-start gap-4">
              <Button
                variant="secondary"
                type="button"
                onClick={addRequiredInput}
              >
                <PlusIcon />
                Add input
              </Button>
              {form.getValues("required_inputs").map((input, index) => (
                <Collapsible className="w-full" key={input.id}>
                  <div
                    className="flex gap-4 rounded-md border p-2"
                    key={input.id}
                  >
                    <NodeInput
                      value={input.id}
                      onChange={(newId) =>
                        form.setValue(
                          "required_inputs",
                          form
                            .getValues("required_inputs")
                            .map((input, i) =>
                              i === index ? { ...input, id: newId } : input,
                            ),
                        )
                      }
                    />
                    <CollapsibleTrigger asChild>
                      <Button variant={"secondary"} type="button">
                        View/Edit {(input.data as FileType).name}
                      </Button>
                    </CollapsibleTrigger>
                    <Button
                      variant={"destructive"}
                      onClick={() => {
                        form.setValue(
                          "required_inputs",
                          form
                            .watch("required_inputs")
                            .filter((_, i) => i !== index),
                        );
                      }}
                    >
                      <Trash />
                    </Button>
                  </div>
                  <CollapsibleContent>
                    <div className="h-[50vh]">
                      <FileEditor
                        fileName={(input.data as FileType).name}
                        fileContent={(input.data as FileType).content}
                        onUpdateFileName={(newFileName: string) => {
                          onUpdateFileName(index, newFileName);
                        }}
                        onUpdateFileContent={(newFileContent: string) => {
                          onUpdateFileContent(index, newFileContent);
                        }}
                        isEditing
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </FormSection>
          <hr />
          <div className="flex w-full flex-col items-start">
            <div className="sticky top-0 w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Testcases</h2>
                <Button variant="secondary" type="button" onClick={addTestcase}>
                  <PlusIcon />
                  Add testcase
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              {form.watch("testcases").map((testcase) => (
                <div
                  className="p-4"
                  key={testcase.id + JSON.stringify(userInputNode)}
                >
                  <Collapsible defaultOpen>
                    <div className="flex justify-between">
                      <CollapsibleTrigger asChild>
                        <Button className="hover:text-purple-500">
                          Testcase #{testcase.id + 1}
                        </Button>
                      </CollapsibleTrigger>
                      <Button
                        variant="destructive"
                        type="button"
                        onClick={() => {
                          form.setValue(
                            "testcases",
                            form
                              .watch("testcases")
                              .filter((t) => t.id !== testcase.id),
                          );
                        }}
                      >
                        <Trash />
                      </Button>
                    </div>

                    <CollapsibleContent>
                      <TestcaseNodeGraph
                        key={testcase.id}
                        steps={testcase.nodes.concat(userInputNode)}
                        edges={testcase.edges}
                        isEditing
                        // Note: I couldn't figure out how to make this subscribe to the child's nodes/edges
                        // so I am just replaying the dispatched actions...
                        onChange={(action: GraphAction) => {
                          const target = form
                            .getValues()
                            .testcases.filter((t) => testcase.id === t.id)[0];
                          const nextState = produce(
                            {
                              steps: target.nodes.concat({ ...userInputNode }),
                              edges: target.edges,
                              selectedStepId: null,
                              selectedSocketId: null,
                              isEditing: true,
                            },
                            (draft) => {
                              graphReducer(draft, action);
                            },
                          );

                          const { steps, edges } = nextState;

                          const updatedTestcases = [
                            ...form.getValues("testcases").map((t) =>
                              t.id === testcase.id
                                ? {
                                    ...t,
                                    nodes: steps.filter(
                                      (node) => node.id !== 0,
                                    ),
                                    edges,
                                  }
                                : t,
                            ),
                          ];

                          form.setValue("testcases", updatedTestcases);
                        }}
                      />
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <Button className="bg-purple-600 text-white hover:bg-purple-600 hover:bg-opacity-80">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProgrammingForm;
