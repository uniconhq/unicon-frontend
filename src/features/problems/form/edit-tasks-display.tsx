import { PlusIcon } from "lucide-react";

import { Task } from "@/components/tasks/task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskType } from "@/features/problems/queries";

import CreateTaskPopover from "./create-task-popover";

type OwnProps = {
  tasks: TaskType[];
};

const EditTasksDisplay: React.FC<OwnProps> = ({ tasks }) => {
  return (
    <div className="p-4">
      <h2 className="min-w-[200px] text-lg font-medium">Tasks</h2>
      {tasks.length === 0 && (
        <div className="rounded-sm bg-secondary p-4 text-center shadow-inner">
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
            {tasks.map((task, index) => (
              <Card key={index} className="bg-inherit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-4 font-mono">
                    <span className="text-lg font-medium">
                      Task #{index + 1}
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
                  </CardTitle>
                  <CardContent className="p-0 py-2">
                    <Task task={task} />
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EditTasksDisplay;
