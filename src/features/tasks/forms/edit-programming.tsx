import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ProgrammingTask } from "@/api";
import { useUpdateTask } from "@/features/problems/queries";
import { useProjectId } from "@/features/projects/hooks/use-id";
import ProgrammingForm, {
  ProgrammingFormType,
} from "@/features/tasks/forms/programming-form";
import { isSafeChangeForProgrammingTask } from "@/utils/task";

import RerunDialog from "./rerun-dialog";

type OwnProps = {
  task: ProgrammingTask;
  problemId: number;
};

const EditProgramming: React.FC<OwnProps> = ({ task, problemId }) => {
  const projectId = useProjectId();

  const updateTaskMutation = useUpdateTask(problemId, task.id);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState<ProgrammingFormType | null>(null);
  const [isSafe, setIsSafe] = useState<boolean>(false);

  const updateTask = (data: ProgrammingFormType) => (rerun: boolean) => {
    updateTaskMutation.mutate(
      {
        task: {
          ...task,
          ...data,
          environment: {
            ...data.environment,
          },
        },
        rerun,
      },
      {
        onSuccess: () => {
          navigate(`/projects/${projectId}/problems/${problemId}/edit`);
        },
      },
    );
  };

  const onSubmit: SubmitHandler<ProgrammingFormType> = async (data) => {
    setOpenDialog(true);
    setData(data);
    setIsSafe(isSafeChangeForProgrammingTask(task, data));
  };

  return (
    <>
      {openDialog && data && (
        <RerunDialog
          isSafe={isSafe}
          onClose={() => setOpenDialog(false)}
          onSaveWithoutRerun={() => updateTask(data)(false)}
          onSaveWithRerun={() => updateTask(data)(true)}
        />
      )}
      <ProgrammingForm
        title="Edit programming task"
        onSubmit={onSubmit}
        initialValue={{
          ...task,
          autograde: !!task.autograde,
          environment: {
            ...task.environment,
            extra_options: {
              ...task.environment.extra_options,
              version: task.environment.extra_options?.version ?? "3.11.9",
              requirements: task.environment.extra_options?.requirements ?? "",
            },
            slurm_options: task.environment.slurm_options ?? [],
          },
        }}
      />
    </>
  );
};

export default EditProgramming;
