import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TaskType } from "@/features/problems/queries";
import TaskCard from "@/features/tasks/components/task-card";

import CreateTaskPopover from "./create-task-popover";

type OwnProps = {
  tasks: TaskType[];
  problemId: number;
  projectId: number;
};

const EditTasksDisplay: React.FC<OwnProps> = ({
  tasks,
  problemId,
  projectId,
}) => {
  return (
    <div>
      <h2 className="min-w-[200px] text-lg font-medium">Tasks</h2>
      {tasks.length === 0 && (
        <div className="mt-4 rounded-sm bg-secondary p-4 text-center shadow-inner">
          You don't have any tasks.{" "}
          <CreateTaskPopover>
            <span className="text-purple-400 hover:text-purple-400/80">
              Create one?
            </span>
          </CreateTaskPopover>
        </div>
      )}
      {tasks.length > 0 && (
        <>
          <CreateTaskPopover>
            <Button variant={"secondary"} className="mt-2" type="button">
              <PlusIcon />
              Add task
            </Button>
          </CreateTaskPopover>
          <div className="mt-4 flex flex-col gap-2">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                problemId={problemId}
                projectId={projectId}
                edit={true}
                submit={false}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EditTasksDisplay;
