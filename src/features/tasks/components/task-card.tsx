import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import ConfirmationDialog from "@/components/confirmation-dialog";
import { Task } from "@/components/tasks/task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskType, useDeleteTask } from "@/features/problems/queries";

type OwnProps = {
  task: TaskType;
  problemId: number;
  projectId: number;
  edit: boolean;
  submit: boolean;
};

const TaskCard: React.FC<OwnProps> = ({
  task,
  problemId,
  projectId,
  edit,
  submit,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const deleteTaskMutation = useDeleteTask(problemId, task.id);
  const handleDelete = () => {
    deleteTaskMutation.mutate(undefined, {
      onSuccess: () => {
        setOpenDeleteDialog(false);
      },
    });
  };

  return (
    <>
      {openDeleteDialog && (
        <ConfirmationDialog
          description="Deleting this task and all its attempts is irreversible!"
          setOpen={setOpenDeleteDialog}
          onConfirm={handleDelete}
        />
      )}
      <Card className="bg-inherit">
        <CardHeader>
          <CardTitle className="flex items-center justify-between font-mono">
            <div className="flex items-center gap-4">
              <span className="text-lg font-medium">
                Task #{task.order_index + 1}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="rounded-md border border-blue-700 p-2">
                  {task.type}
                </span>
                {task.autograde && (
                  <span className="rounded-md border border-green-700 p-2">
                    Autograded
                  </span>
                )}
              </div>
            </div>
            {edit && (
              <div className="flex items-center gap-4">
                <Button
                  asChild
                  variant="ghost"
                  className="hover:text-purple-300"
                >
                  <Link
                    to={`/projects/${projectId}/problems/${problemId}/edit/tasks/${task.id}`}
                  >
                    <Pencil />
                    Edit
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={() => setOpenDeleteDialog(true)}
                >
                  <Trash />
                  Delete
                </Button>
              </div>
            )}
          </CardTitle>
          <CardContent className="p-0 py-2">
            <Task submit={submit && !edit} problemId={problemId} task={task} />
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
};
export default TaskCard;
