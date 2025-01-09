import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCreateTask } from "@/features/problems/queries";
import { useProblemId, useProjectId } from "@/features/projects/hooks/use-id";
import ProgrammingForm, {
  ProgrammingFormType,
} from "@/features/tasks/forms/programming-form";

const CreateProgramming = () => {
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

  return <ProgrammingForm onSubmit={onSubmit} />;
};

export default CreateProgramming;
