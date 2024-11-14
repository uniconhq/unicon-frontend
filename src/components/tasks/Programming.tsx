import { ProgrammingTask } from "@/api";
import { Button } from "@/components/ui/button";

export function Programming({ task }: { task: ProgrammingTask }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-medium text-gray-300">QUESTION</span>
      {task.question}
      <span className="text-xs font-medium text-gray-300">ENVIRONMENT</span>
      <div className="flex flex-col gap-2 font-mono text-sm">
        <span>Language: {task.environment.language}</span>
        <span>Time Limit: {task.environment.time_limit}s</span>
        <span>Memory Limit: {task.environment.memory_limit}MB</span>
        {task.environment.extra_options && (
          <span>
            Extra Options:{" "}
            {JSON.stringify(task.environment.extra_options, null, 4)}
          </span>
        )}
      </div>
      <span className="text-xs font-medium text-gray-300">TESTCASES</span>
      <div className="flex flex-row gap-2 font-mono">
        {task.testcases.map((_, index) => (
          <Button key={index} className="hover:text-purple-500">
            Testcase #{index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}