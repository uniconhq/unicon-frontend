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
      ).choices?.map((choice) => (
        <div
          className={cn("flex gap-2 px-1", {
            "bg-green-800/50": taskResult.result?.correct_choices.includes(
              choice.id,
            ),
            "bg-red-800/50": taskResult.result?.incorrect_choices.includes(
              choice.id,
            ),
          })}
          key={choice.id}
        >
          <input
            type="radio"
            disabled
            checked={selectedChoices.includes(choice.id)}
          />
          <span>{choice.text}</span>
        </div>
      ))}
    </div>
  );
};

export default MultipleResponseResult;
