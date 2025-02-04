import { zodResolver } from "@hookform/resolvers/zod";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { produce } from "immer";
import { PlusIcon, Trash } from "lucide-react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

import { File as FileType, InputStep, Testcase as TestcaseApi } from "@/api";
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
import Testcase from "@/features/problems/components/tasks/testcase";

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
    extra_options: z.object({
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
  testcases: z.array(z.custom<TestcaseApi>(() => true)),
});

export type ProgrammingFormType = z.infer<typeof programmingFormSchema>;

const programmingFormDefault = {
  question: "",
  autograde: true,
  environment: {
    language: "PYTHON" as const,
    extra_options: {
      version: "3.11.9",
    },
    time_limit_secs: 1,
    memory_limit_mb: 256,
  },
  required_inputs: [],
  testcases: [],
};

type OwnProps = {
  title: string;
  initialValue?: ProgrammingFormType;
  onSubmit: SubmitHandler<ProgrammingFormType>;
};

const ProgrammingForm: React.FC<OwnProps> = ({
  title,
  initialValue,
  onSubmit,
}) => {
  const form = useForm<ProgrammingFormType>({
    resolver: zodResolver(programmingFormSchema),
    defaultValues: initialValue ?? programmingFormDefault,
  });

  const inputs = useFieldArray({ control: form.control, name: "required_inputs" }); // prettier-ignore
  const testcases = useFieldArray({ control: form.control, name: "testcases" });

  const userInputNode: InputStep = {
    id: 0,
    type: "INPUT_STEP",
    inputs: [],
    outputs: form.getValues("required_inputs"),
  };

  const addTestcase = () => {
    const newId = Math.max(...form.watch("testcases").map((t) => t.id), -1) + 1;
    testcases.append({ id: newId, nodes: [], edges: [] });
  };

  const addInput = () => {
    const parseInputId = (id: string) => parseInt(id.split(".").slice(-1)[0]);
    const newId =
      Math.max(
        ...form.watch("required_inputs").map((input) => parseInputId(input.id)),
        -1,
      ) + 1;
    inputs.append({
      id: `DATA.TEMP.${newId}`,
      data: {
        name: `file${newId}.py`,
        content: "def some_function():\n\tpass",
      },
    });
  };

  const updateInput = useDebouncedCallback(
    (
      index: number,
      {
        newId,
        newFileName,
        newFileContent,
      }: { newId?: string; newFileName?: string; newFileContent?: string },
    ) => {
      const oldInput = form.watch("required_inputs")[index];
      const oldInputFileData = oldInput.data as FileType;
      inputs.update(index, {
        ...oldInput,
        id: newId ?? oldInput.id,
        data: {
          ...(oldInput.data as FileType),
          name: newFileName ?? oldInputFileData.name,
          content: newFileContent ?? oldInputFileData.content,
        },
      });
    },
    500,
  );

  const updateTestcase = (index: number) => (action: GraphAction) => {
    const testcase = form.getValues("testcases")[index];
    const newState = produce(
      {
        id: `${testcase.id}`,
        steps: testcase.nodes,
        edges: testcase.edges,
        selectedStepId: null,
        selectedSocketId: null,
        edit: true,
      },
      (draft) => {
        graphReducer(draft, action);
      },
    );

    testcases.update(index, {
      ...testcase,
      // NOTE: We remove the user input node since it is separately added to the graph on re-render
      nodes: newState.steps.filter((node) => node.id !== 0),
      edges: newState.edges,
    });
  };

  return (
    <div className="flex w-full flex-col gap-8 px-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
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
                name="environment.extra_options.version"
                options={[{ label: "3.11.9", value: "3.11.9" }]}
                // disabled
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
              <Button variant="secondary" type="button" onClick={addInput}>
                <PlusIcon />
                Add input
              </Button>
              {form.getValues("required_inputs").map((input, index) => (
                <Collapsible className="w-full" key={index}>
                  <div className="flex gap-4 rounded-md border p-2" key={index}>
                    <NodeInput
                      className={["min-w-[160px]"]}
                      value={input.id}
                      onChange={(newId) => updateInput(index, { newId })}
                    />
                    <CollapsibleTrigger asChild>
                      <Button variant={"secondary"} type="button">
                        View/Edit {(input.data as FileType).name}
                      </Button>
                    </CollapsibleTrigger>
                    <Button
                      type="button"
                      variant={"destructive"}
                      onClick={() => inputs.remove(index)}
                    >
                      <Trash />
                    </Button>
                  </div>
                  <CollapsibleContent>
                    <div className="h-[50vh]">
                      <FileEditor
                        fileName={(input.data as FileType).name}
                        fileContent={(input.data as FileType).content}
                        onUpdateFileName={(newFileName: string) =>
                          updateInput(index, { newFileName })
                        }
                        onUpdateFileContent={(newFileContent: string) =>
                          updateInput(index, { newFileContent })
                        }
                        editableContent={true}
                        editableName={true}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </FormSection>
          <hr />
          <div className="flex w-full flex-col items-start">
            <div className="sticky top-0 z-20 w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Testcases</h2>
                <Button variant="secondary" type="button" onClick={addTestcase}>
                  <PlusIcon />
                  Add testcase
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              {form.watch("testcases").map((testcase, index) => (
                <div className="mt-2" key={testcase.id}>
                  <Testcase
                    index={index}
                    testcase={testcase}
                    userInput={userInputNode}
                    edit={true}
                    nodeGraphOnChange={updateTestcase(index)}
                    onDelete={testcases.remove}
                  />
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
