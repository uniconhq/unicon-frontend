import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { MultipleChoiceTask } from "@/api";
import { useUpdateTask } from "@/features/problems/queries";
import { useProjectId } from "@/features/projects/hooks/use-id";

import MultipleChoiceForm, {
  MultipleChoiceFormType,
} from "./multiple-choice-form";

type OwnProps = {
  task: MultipleChoiceTask;
  problemId: number;
};

const EditMultipleChoice: React.FC<OwnProps> = ({ task, problemId }) => {
  const projectId = useProjectId();

  const updateTaskMutation = useUpdateTask(problemId, task.id);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<MultipleChoiceFormType> = async (data) => {
    updateTaskMutation.mutate(
      {
        task: {
          ...task,
          ...data,
          choices: data.choices.map((choice, index) => ({
            ...choice,
            order_index: index,
          })),
        },
        rerun: true,
      },
      {
        onSuccess: () => {
          navigate(`/projects/${projectId}/problems/${problemId}/edit`);
        },
      },
    );
  };

  return (
    <MultipleChoiceForm
      title="Edit multiple choice task"
      onSubmit={onSubmit}
      // @ts-expect-error edited tasks would come with choices
      initialValue={task}
    />
  );
};

export default EditMultipleChoice;
