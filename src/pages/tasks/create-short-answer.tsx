import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCreateTask } from "@/features/problems/queries";
import { useProblemId, useProjectId } from "@/features/projects/hooks/use-id";

import ShortAnswerForm, {
  ShortAnswerFormType,
} from "../../features/tasks/forms/short-answer-form";

const CreateShortAnswer = () => {
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

  return <ShortAnswerForm onSubmit={onSubmit} />;
};

export default CreateShortAnswer;
