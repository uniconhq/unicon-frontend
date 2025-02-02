import { OnDragEndResponder } from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import React from "react";
import {
  SubmitHandler,
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
} from "react-hook-form";
import { z } from "zod";

import CheckboxField from "@/components/form/fields/checkbox-field";
import ErrorAlert from "@/components/form/fields/error-alert";
import TextField from "@/components/form/fields/text-field";
import FormSection from "@/components/form/form-section";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import Choices, { formWithChoicesSchema, FormWithChoicesType } from "./choices";

const multipleChoiceFormSchema = formWithChoicesSchema
  .extend({
    question: z.string().min(1, "Question cannot be empty"),
    expected_answer: z.number().min(0, "Correct choice cannot be empty"),
    autograde: z.boolean(),
  })
  .refine(
    (data) =>
      data.choices.map((choice) => choice.id).includes(data.expected_answer),
    {},
  );

export type MultipleChoiceFormType = z.infer<typeof multipleChoiceFormSchema>;

const multipleChoiceFormDefault = {
  question: "",
  choices: [],
  expected_answer: -1,
  autograde: true,
};

type OwnProps = {
  initialValue?: MultipleChoiceFormType;
  onSubmit: SubmitHandler<MultipleChoiceFormType>;
};

const MultipleChoiceForm: React.FC<OwnProps> = ({ initialValue, onSubmit }) => {
  const form = useForm<MultipleChoiceFormType>({
    resolver: zodResolver(multipleChoiceFormSchema),
    defaultValues: initialValue ?? multipleChoiceFormDefault,
  });

  const { formState, trigger } = form;
  const choices = useFieldArray({
    control: form.control,
    name: "choices",
    keyName: "genId",
  });

  const onDragEnd: OnDragEndResponder<string> = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    if (source.index === destination.index) {
      return;
    }

    choices.move(source.index, destination.index);
  };

  const isChecked = (index: number) =>
    form.getValues().choices[index].id === form.getValues().expected_answer;

  const onCheck = (choiceId: number) => {
    form.setValue("expected_answer", choiceId);
    form.trigger("expected_answer");
  };

  const onDelete = (index: number) => {
    if (form.getValues().expected_answer === choices.fields[index].id) {
      form.setValue("expected_answer", -1);
      trigger("expected_answer");
    }
    choices.remove(index);
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
                  const id = choices.fields.length
                    ? Math.max(...choices.fields.map((choice) => choice.id)) + 1
                    : 0;
                  choices.append({ id, text: "" });
                }}
              >
                <PlusIcon />
                Add choice
              </Button>
              {formState.errors.expected_answer && (
                <ErrorAlert message="Select the correct option." />
              )}
              <Choices
                choices={
                  choices as unknown as UseFieldArrayReturn<
                    FormWithChoicesType,
                    "choices",
                    "genId"
                  >
                }
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

export default MultipleChoiceForm;
