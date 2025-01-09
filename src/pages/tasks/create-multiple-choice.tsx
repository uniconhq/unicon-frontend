import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useCreateTask } from "@/features/problems/queries";
import { useProblemId, useProjectId } from "@/features/projects/hooks/use-id";

import MultipleChoiceForm, {
  MultipleChoiceFormType,
} from "../../features/tasks/forms/multiple-choice-form";

const CreateMultipleChoice = () => {
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

  return <MultipleChoiceForm onSubmit={onSubmit} />;
};

export default CreateMultipleChoice;
