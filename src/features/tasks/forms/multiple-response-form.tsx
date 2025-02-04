import { OnDragEndResponder } from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import {
  SubmitHandler,
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
} from "react-hook-form";
import { z } from "zod";

import CheckboxField from "@/components/form/fields/checkbox-field";
import ErrorAlert from "@/components/form/fields/error-alert";
import TextareaField from "@/components/form/fields/textarea-field";
import FormSection from "@/components/form/form-section";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import Choices, { formWithChoicesSchema, FormWithChoicesType } from "./choices";

const multipleResponseFormSchema = formWithChoicesSchema
  .extend({
    question: z.string().min(1, "Question cannot be empty"),
    expected_answer: z
      .array(z.number())
      .nonempty("Correct choices cannot be empty"),
    autograde: z.boolean(),
  })
  .refine((data) => {
    const ids = data.choices.map((choice) => choice.id);
    return data.expected_answer.every((answer) => ids.includes(answer));
  }, {});

export type MultipleResponseFormType = z.infer<
  typeof multipleResponseFormSchema
>;

const multipleChoiceFormDefault = {
  question: "",
  choices: [],
  expected_answer: [],
  autograde: true,
};

type OwnProps = {
  initialValue?: MultipleResponseFormType;
  onSubmit: SubmitHandler<MultipleResponseFormType>;
};

const MultipleResponseForm: React.FC<OwnProps> = ({
  initialValue,
  onSubmit,
}) => {
  const form = useForm<MultipleResponseFormType>({
    resolver: zodResolver(multipleResponseFormSchema),
    defaultValues: initialValue ?? multipleChoiceFormDefault,
  });

  const choices = useFieldArray({
    control: form.control,
    name: "choices",
    keyName: "genId",
  });

  const { formState, setValue, getValues, trigger } = form;

  const onDragEnd: OnDragEndResponder<string> = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    if (source.index === destination.index) {
      return;
    }
    choices.move(source.index, destination.index);
  };

  const isChecked = (index: number) => {
    const choice = choices.fields[index];
    return form.getValues().expected_answer.includes(choice.id);
  };

  const onCheck = (index: number) => {
    const choice = choices.fields[index];
    if (isChecked(index)) {
      form.setValue(
        "expected_answer",
        getValues().expected_answer.filter((i) => i !== choice.id) as [
          number,
          ...number[],
        ],
      );
    } else {
      form.setValue("expected_answer", [...getValues().expected_answer, index]);
    }

    form.trigger("expected_answer");
  };
  const onDelete = (index: number) => {
    choices.remove(index);

    setValue(
      "expected_answer",
      getValues()
        .expected_answer.filter((i) => i !== index)
        .map((i) => (i < index ? index : index - 1)) as [number, ...number[]],
    );

    trigger("expected_answer");
  };

  return (
    <div className="flex w-full flex-col gap-8 px-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">New multiple response task</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormSection title="Task details">
            <TextareaField label="Question" name="question" />
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

export default MultipleResponseForm;
