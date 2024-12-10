import {
  MultipleResponseTask,
  MultipleResponseTaskResult,
  TaskAttemptPublic,
} from "@/api";
import { cn } from "@/lib/utils";

type OwnProps = {
  taskAttempt: TaskAttemptPublic;
};

const MultipleResponseResult: React.FC<OwnProps> = ({ taskAttempt }) => {
  const taskResults = taskAttempt.task_results as MultipleResponseTaskResult[];
  const taskResult = taskResults[0];

  if (!taskResult || taskResult.result === null) {
    return null;
  }

  const selectedChoices = taskResult?.result?.correct_choices.concat(
    taskResult.result?.incorrect_choices,
  );

  return (
    <div className="flex flex-col gap-1">
      {(
        taskAttempt.task.other_fields as unknown as MultipleResponseTask
      ).choices?.map((choice, index) => (
        <div
          className={cn("flex gap-2 px-1", {
            "bg-green-800/50":
              taskResult.result?.correct_choices.includes(index),
            "bg-red-800/50":
              taskResult.result?.incorrect_choices.includes(index),
          })}
        >
          <input
            type="radio"
            disabled
            checked={selectedChoices.includes(index)}
          />
          <span>{choice}</span>
        </div>
      ))}
    </div>
  );
};

export default MultipleResponseResult;
