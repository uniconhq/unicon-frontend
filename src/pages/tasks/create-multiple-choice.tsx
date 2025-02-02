import { useQuery } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { getProblemById, useCreateTask } from "@/features/problems/queries";
import { useProblemId, useProjectId } from "@/features/projects/hooks/use-id";

import MultipleChoiceForm, {
  MultipleChoiceFormType,
} from "../../features/tasks/forms/multiple-choice-form";
import { Unauthorized } from "../error";

const CreateMultipleChoice = () => {
  const problemId = useProblemId();
  const projectId = useProjectId();

  const createTaskMutation = useCreateTask(problemId);
  const navigate = useNavigate();

  const { data } = useQuery(getProblemById(problemId));
  if (data && !data.edit) {
    throw Unauthorized;
  }

  const onSubmit: SubmitHandler<MultipleChoiceFormType> = async (data) => {
    createTaskMutation.mutate(
      {
        ...data,
        choices: data.choices.map((choice, index) => ({
          id: index,
          order_index: index,
          text: choice,
        })),
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
