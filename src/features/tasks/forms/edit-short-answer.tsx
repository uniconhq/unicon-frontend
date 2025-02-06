import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ShortAnswerTask } from "@/api";
import { useUpdateTask } from "@/features/problems/queries";
import { useProjectId } from "@/features/projects/hooks/use-id";

import ShortAnswerForm, { ShortAnswerFormType } from "./short-answer-form";

type OwnProps = {
  task: ShortAnswerTask;
  problemId: number;
};

const EditShortAnswer: React.FC<OwnProps> = ({ task, problemId }) => {
  const projectId = useProjectId();

  const updateTaskMutation = useUpdateTask(problemId, task.id);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ShortAnswerFormType> = async (data) => {
    updateTaskMutation.mutate(
      {
        task: { ...task, ...data },
        // It is always safe (input is a string and remains compatible) to rerun a short answer task.
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
    <ShortAnswerForm
      title="Edit short answer task"
      onSubmit={onSubmit}
      initialValue={{ ...task, expected_answer: task.expected_answer ?? "" }}
    />
  );
};

export default EditShortAnswer;
