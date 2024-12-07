import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Params, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import TextField from "@/components/form/fields/text-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateProject } from "@/features/projects/queries";

const projectFormSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
});

type ProjectFormType = z.infer<typeof projectFormSchema>;

const projectFormDefault = {
  name: "",
};

const CreateProject = () => {
  const [error, setError] = useState("");

  const form = useForm<ProjectFormType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: projectFormDefault,
  });

  const { id } = useParams<Params<"id">>();

  const createProjectMutation = useCreateProject(parseInt(id!));
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ProjectFormType> = async (data) => {
    createProjectMutation.mutate(data, {
      onError: (error) => {
        setError(error.message);
      },
      onSuccess: (response) => {
        navigate(`/projects/${response.data?.id}`);
      },
    });
  };

  return (
    <div className="m-auto flex w-full max-w-5xl flex-col gap-8 px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create new project</h1>
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <TextField name="name" label="Name" />
          <div>
            <Button className="bg-purple-600 text-white hover:bg-purple-600 hover:bg-opacity-80">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateProject;
