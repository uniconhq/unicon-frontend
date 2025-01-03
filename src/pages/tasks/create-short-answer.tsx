import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import CheckboxField from "@/components/form/fields/checkbox-field";
import TextField from "@/components/form/fields/text-field";
import FormSection from "@/components/form/form-section";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateTask } from "@/features/problems/queries";
import { useProblemId, useProjectId } from "@/features/projects/hooks/use-id";

const shortAnswerFormSchema = z
  .object({
    question: z.string().min(1, "Question cannot be empty"),
    expected_answer: z.string(),
    autograde: z.boolean().optional(),
  })
  .refine((data) => !data.autograde || data.expected_answer.length > 0, {
    message: "Expected answer cannot be empty if autograde is enabled",
    path: ["expected_answer"],
  });

type ShortAnswerFormType = z.infer<typeof shortAnswerFormSchema>;
const shortAnswerFormDefault = {
  question: "",
  expected_answer: "",
  autograded: false,
};

const CreateShortAnswer = () => {
  const form = useForm<ShortAnswerFormType>({
    resolver: zodResolver(shortAnswerFormSchema),
    defaultValues: shortAnswerFormDefault,
  });

  const problemId = useProblemId();
  const projectId = useProjectId();

  const createTaskMutation = useCreateTask(problemId);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ShortAnswerFormType> = async (data) => {
    createTaskMutation.mutate(
      {
        ...data,
        type: "SHORT_ANSWER_TASK",
        id: -1,
      },
      {
        onSuccess: () => {
          navigate(`/projects/${projectId}/problems/${problemId}/edit`);
        },
      },
    );
  };

  const { watch } = form;

  return (
    <div className="flex w-full flex-col gap-8 px-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">New short answer task</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormSection title="Task details">
            <TextField label="Question" name="question" />
          </FormSection>
          <hr />
          <FormSection title="Autograde?">
            <CheckboxField label="" name="autograde" className="mt-2" />
            {watch("autograde") && (
              <TextField label="Expected answer" name="expected_answer" />
            )}
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

export default CreateShortAnswer;
