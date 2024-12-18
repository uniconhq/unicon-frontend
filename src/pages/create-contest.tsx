import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Params, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import ErrorAlert from "@/components/form/fields/error-alert";
import TextareaField from "@/components/form/fields/textarea-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateProblem } from "@/features/definitions/queries";
import { json } from "@/utils/json";

const definitionFormSchema = z.object({
  definition: z
    .string()
    .min(1, "Definition cannot be empty")
    .transform((str, ctx): z.infer<ReturnType<typeof json>> => {
      try {
        return JSON.parse(str);
      } catch {
        ctx.addIssue({ code: "custom", message: "Invalid JSON" });
        return z.NEVER;
      }
    }),
});

type DefinitionFormType = z.infer<typeof definitionFormSchema>;
const definitionFormDefault = {
  definition: "",
};

const CreateContest = () => {
  const { id } = useParams<Params<"id">>();
  const idNumber = Number(id);

  const createDefinitionMutation = useCreateProblem(idNumber);
  const navigate = useNavigate();

  // @ts-expect-error - it is infinitely deep because of the definition in json.ts
  const form = useForm<DefinitionFormType>({
    resolver: zodResolver(definitionFormSchema),
    defaultValues: definitionFormDefault,
  });

  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<DefinitionFormType> = async (data) => {
    // @ts-expect-error - just let the backend validate it
    createDefinitionMutation.mutate(data.definition, {
      onSettled: (response) => {
        if (!response) {
          // this should not happen
          return;
        }
        if (response.status === 200) {
          navigate(`/projects/${id}/problems/${response.data?.id}`);
        } else {
          setError(JSON.stringify(response.error));
        }
      },
    });
  };

  return (
    <div className="flex w-full flex-col gap-8 px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create new contest</h1>
      </div>
      {error && <ErrorAlert message={error} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextareaField
            label="Contest definition"
            name="definition"
            rows={20}
          />
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

export default CreateContest;
