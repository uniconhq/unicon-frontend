import {
  MultipleChoiceTaskResult,
  MultipleResponseTaskResult,
  ProgrammingTaskResult,
  TaskAttemptPublic,
  TaskResult,
} from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import MultipleChoiceResult from "./result-types/MultipleChoiceResult";
import MultipleResponseResult from "./result-types/MultipleResponseResult";
import ProgrammingResult from "./result-types/ProgrammingResult";

type OwnProps = {
  taskAttempt: TaskAttemptPublic;
};

const taskStatusToColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-400";
    case "SUCCESS":
      return "bg-green-400";
    case "SKIPPED":
      return "bg-gray-400";
  }
};

const parseDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return date.toLocaleString();
};

const TaskResultCard: React.FC<OwnProps> = ({ taskAttempt }) => {
  const taskResult = taskAttempt.task_results[0] as TaskResult;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4 font-mono">
          <span className="relative flex h-4 w-4">
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full",
                taskStatusToColor(taskResult.status),
                taskResult.status === "PENDING" ? "animate-ping" : "",
              )}
            ></span>
            <span
              className={cn(
                "absolute inline-flex h-4 w-4 rounded-full",
                taskStatusToColor(taskResult.status),
              )}
            ></span>
          </span>
          <span className="text-lg font-medium">
            Task #{taskAttempt.task_id + 1}
          </span>
        </CardTitle>
        {taskResult.status != "SKIPPED" && (
          <CardDescription className="flex flex-col gap-1 py-2 font-mono text-sm">
            <span>STARTED: {parseDateTime(taskResult.started_at)}</span>
            {taskResult.completed_at && (
              <span>FINISHED: {parseDateTime(taskResult.completed_at)}</span>
            )}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2 font-mono">
        {taskResult.status == "SKIPPED" ? (
          <span className="text-gray-300">Manual grading is required!</span>
        ) : (
          <>
            {taskAttempt.task.type === "PROGRAMMING_TASK" && (
              <ProgrammingResult
                taskResult={taskResult as ProgrammingTaskResult}
              />
            )}
            {taskAttempt.task.type === "MULTIPLE_CHOICE_TASK" && (
              <MultipleChoiceResult
                taskResult={taskResult as MultipleChoiceTaskResult}
              />
            )}
            {taskAttempt.task.type === "SHORT_ANSWER_TASK" && (
              <pre className="whitespace-pre-wrap rounded-md bg-gray-900 p-4 text-gray-100">
                {JSON.stringify(taskResult.result, null, 2)}
              </pre>
            )}
            {taskAttempt.task.type === "MULTIPLE_RESPONSE_TASK" && (
              <MultipleResponseResult
                taskResult={taskResult as MultipleResponseTaskResult}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskResultCard;
