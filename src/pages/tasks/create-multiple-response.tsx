import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCreateTask } from "@/features/problems/queries";
import { useProblemId, useProjectId } from "@/features/projects/hooks/use-id";
import MultipleResponseForm, {
  MultipleResponseFormType,
} from "@/features/tasks/forms/multiple-response-form";

const CreateMultipleResponse = () => {
  const problemId = useProblemId();
  const projectId = useProjectId();

  const createTaskMutation = useCreateTask(problemId);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<MultipleResponseFormType> = async (data) => {
    createTaskMutation.mutate(
      {
        ...data,
        type: "MULTIPLE_RESPONSE_TASK",
        id: -1,
      },
      {
        onSuccess: () => {
          navigate(`/projects/${projectId}/problems/${problemId}/edit`);
        },
      },
    );
  };

  return <MultipleResponseForm onSubmit={onSubmit} />;
};

export default CreateMultipleResponse;
