import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import TextareaField from "@/components/form/fields/textarea-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateDefinition } from "@/features/definitions/queries";
import { useUserStore } from "@/store/user/user-store-provider";
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
  const { user, isLoading } = useUserStore((store) => store);
  const createDefinitionMutation = useCreateDefinition();
  const navigate = useNavigate();

  // @ts-expect-error - it is infinitely deep because of the definition in json.ts
  const form = useForm<DefinitionFormType>({
    resolver: zodResolver(definitionFormSchema),
    defaultValues: definitionFormDefault,
  });

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, navigate, isLoading]);

  const [error, setError] = useState("");

  if (!user) {
    return;
  }

  const onSubmit: SubmitHandler<DefinitionFormType> = async (data) => {
    // @ts-expect-error - just let the backend validate it
    createDefinitionMutation.mutate(data.definition, {
      onSettled: (response) => {
        if (!response) {
          // this should not happen
          return;
        }
        if (response.status === 200) {
          navigate(`/contests/${response.data?.id}`);
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
      {error && (
        <Alert variant="destructive">
          <div>
            <CircleAlert className="h-5 w-5" />
          </div>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
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
