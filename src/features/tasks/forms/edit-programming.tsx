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
  // const [onSave, setOnSave] = useState<(rerun: boolean) => void>(() => {});

  const [data, setData] = useState<ProgrammingFormType | null>(null);

  const updateTask = (data: ProgrammingFormType) => (rerun: boolean) => {
    updateTaskMutation.mutate(
      {
        task: { ...task, ...data },
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
    if (isSafeChangeForProgrammingTask(task, data)) {
      updateTask(data)(true);
      return;
    } else {
      setOpenDialog(true);
      setData(data);
    }
  };

  return (
    <>
      {openDialog && data && (
        <RerunDialog
          onClose={() => setOpenDialog(false)}
          onSaveWithoutRerun={() => updateTask(data)(false)}
          onSaveWithRerun={() => updateTask(data)(true)}
        />
      )}
      <ProgrammingForm
        title="Edit programming task"
        onSubmit={onSubmit}
        // @ts-expect-error version is defined because this is an edited task
        initialValue={{ ...task, autograde: !!task.autograde }}
      />
    </>
  );
};

export default EditProgramming;
