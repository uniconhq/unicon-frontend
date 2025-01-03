import { OnDragEndResponder } from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import CheckboxField from "@/components/form/fields/checkbox-field";
import ErrorAlert from "@/components/form/fields/error-alert";
import TextField from "@/components/form/fields/text-field";
import FormSection from "@/components/form/form-section";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateTask } from "@/features/problems/queries";
import { useProblemId, useProjectId } from "@/features/projects/hooks/use-id";

import Choices from "./choices";

const multipleChoiceFormSchema = z
  .object({
    question: z.string().min(1, "Question cannot be empty"),
    choices: z.array(z.string()).nonempty("Choices cannot be empty"),
    expected_answer: z.number().min(0, "Correct choice cannot be empty"),
    autograde: z.boolean(),
  })
  .refine(
    (data) =>
      0 <= data.expected_answer && data.expected_answer < data.choices.length,
    {},
  );

type MultipleChoiceFormType = z.infer<typeof multipleChoiceFormSchema>;
const multipleChoiceFormDefault = {
  question: "",
  choices: [],
  expected_answer: -1,
  autograde: true,
};

const CreateMultipleChoice = () => {
  const form = useForm<MultipleChoiceFormType>({
    resolver: zodResolver(multipleChoiceFormSchema),
    defaultValues: multipleChoiceFormDefault,
  });

  const problemId = useProblemId();
  const projectId = useProjectId();

  const createTaskMutation = useCreateTask(problemId);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<MultipleChoiceFormType> = async (data) => {
    createTaskMutation.mutate(
      {
        ...data,
        type: "MULTIPLE_CHOICE_TASK",
        id: -1,
      },
      {
        onSuccess: () => {
          navigate(`/projects/${projectId}/problems/${problemId}/edit`);
        },
      },
    );
  };

  const { formState, setValue, getValues, trigger } = form;

  const onDragEnd: OnDragEndResponder<string> = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    if (source.index === destination.index) {
      return;
    }

    // swap the choice
    const choice = getValues().choices[source.index];
    const newChoices = [...getValues().choices];
    newChoices.splice(source.index, 1);
    newChoices.splice(destination.index, 0, choice);

    // @ts-expect-error - it's okay for the user to delete all choices, just don't let them submit
    form.setValue("choices", [...newChoices]);
    trigger("choices");

    // fix expected answer after the move
    if (source.index == getValues().expected_answer) {
      form.setValue("expected_answer", destination.index);
    } else if (
      source.index < getValues().expected_answer &&
      destination.index >= getValues().expected_answer
    ) {
      setValue("expected_answer", getValues().expected_answer - 1);
    } else if (
      source.index > getValues().expected_answer &&
      destination.index <= getValues().expected_answer
    ) {
      setValue("expected_answer", getValues().expected_answer + 1);
    }
  };

  const isChecked = (index: number) =>
    index == form.getValues().expected_answer;
  const onCheck = (index: number) => {
    form.setValue("expected_answer", index);
    form.trigger("expected_answer");
  };
  const onDelete = (index: number) => {
    setValue(
      "choices",
      // @ts-expect-error - delete all choices - validation fails but its okay as long as user cant submit
      getValues().choices.filter((_, i) => i !== index),
    );

    if (index == form.getValues().expected_answer) {
      form.setValue("expected_answer", -1);
    } else {
      form.setValue(
        "expected_answer",
        form.getValues().expected_answer -
          Number(index < form.getValues().expected_answer),
      );
    }
    trigger("choices");
    trigger("expected_answer");
  };

  return (
    <div className="flex w-full flex-col gap-8 px-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">New multiple choice task</h1>
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
          </FormSection>
          <hr />
          <FormSection title="Choices">
            <div className="flex flex-col items-start gap-4">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => {
                  setValue("choices", [...getValues().choices, ""]);
                  trigger("choices");
                }}
              >
                <PlusIcon />
                Add choice
              </Button>
              {formState.errors.expected_answer && (
                <ErrorAlert message="Select the correct option." />
              )}
              <Choices
                choices={form.getValues().choices}
                onDragEnd={onDragEnd}
                onCheck={onCheck}
                isChecked={isChecked}
                onDelete={onDelete}
              />
            </div>
          </FormSection>

          <div className="ml-4 mt-12">
            <Button className="bg-purple-600 text-white hover:bg-purple-600 hover:bg-opacity-80">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateMultipleChoice;
