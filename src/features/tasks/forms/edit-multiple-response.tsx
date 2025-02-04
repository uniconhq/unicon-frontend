import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { MultipleResponseTask } from "@/api";
import { useUpdateTask } from "@/features/problems/queries";
import { useProjectId } from "@/features/projects/hooks/use-id";
import MultipleResponseForm, {
  MultipleResponseFormType,
} from "@/features/tasks/forms/multiple-response-form";

type OwnProps = {
  task: MultipleResponseTask;
  problemId: number;
};

const EditMultipleResponse: React.FC<OwnProps> = ({ task, problemId }) => {
  const projectId = useProjectId();

  const updateTaskMutation = useUpdateTask(problemId, task.id);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<MultipleResponseFormType> = async (data) => {
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

  return <MultipleResponseForm onSubmit={onSubmit} />;
};

export default EditMultipleResponse;
