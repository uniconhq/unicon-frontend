import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import CheckboxField from "@/components/form/fields/checkbox-field";
import NumberField from "@/components/form/fields/number-field";
import SelectField from "@/components/form/fields/select-field";
import TextField from "@/components/form/fields/text-field";
import FormSection from "@/components/form/form-section";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import TestcaseNodeGraph from "@/features/problems/components/tasks/node-graph";
import { useCreateTask } from "@/features/problems/queries";
import { useProblemId, useProjectId } from "@/features/projects/hooks/use-id";

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
});

type ProgrammingFormType = z.infer<typeof programmingFormSchema>;

const programmingFormDefault = {
  question: "",
  autograded: false,
  environment: {
    language: "PYTHON" as const,
    options: {
      version: "3.11.9",
    },
    time_limit_secs: 1,
    memory_limit_mb: 256,
  },
};

const CreateProgramming = () => {
  const form = useForm<ProgrammingFormType>({
    resolver: zodResolver(programmingFormSchema),
    defaultValues: programmingFormDefault,
  });

  const problemId = useProblemId();
  const projectId = useProjectId();

  const createTaskMutation = useCreateTask(problemId);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ProgrammingFormType> = async (data) => {
    createTaskMutation.mutate(
      {
        ...data,
        type: "PROGRAMMING_TASK",
        id: -1,
        // TODO
        required_inputs: [],
        // TODO
        testcases: [],
      },
      {
        onSuccess: (response) => {
          if (response.status === 200) {
            navigate(`/projects/${projectId}/problems/${problemId}/edit`);
          }
        },
      },
    );
  };

  return (
    <div className="flex w-full flex-col gap-8 px-8">
      <div className="flex items-center justify-between">
        <h1 className="p-4 text-2xl font-semibold">New programming task</h1>
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
          <FormSection title="Testcases">
            <TestcaseNodeGraph steps={[]} edges={[]} />
          </FormSection>

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

export default CreateProgramming;
