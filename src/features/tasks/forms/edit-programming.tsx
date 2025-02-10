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
        // @ts-expect-error version is defined because this is an edited task
        initialValue={{ ...task, autograde: !!task.autograde }}
      />
    </>
  );
};

export default EditProgramming;
