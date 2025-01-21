import { useState } from "react";

import { ProgrammingTask } from "@/api";
import Testcase from "@/features/problems/components/tasks/testcase";

export function Programming({ task }: { task: ProgrammingTask }) {
  const [selectedTestcaseIdx, setSelectedTestcaseIdx] = useState<number | null>(
    null,
  );

  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-medium text-gray-300">QUESTION</span>
      {task.question}
      <span className="text-xs font-medium text-gray-300">ENVIRONMENT</span>
      <div className="flex flex-col gap-2 font-mono text-sm">
        <span>Language: {task.environment.language}</span>
        <span>Time Limit: {task.environment.time_limit_secs}s</span>
        <span>Memory Limit: {task.environment.memory_limit_mb}MB</span>
        {task.environment.extra_options && (
          <span>
            Extra Options:{" "}
            {JSON.stringify(task.environment.extra_options, null, 4)}
          </span>
        )}
      </div>
      <span className="text-xs font-medium text-gray-300">TESTCASES</span>
      <div className="flex gap-2 font-mono">
        {task.testcases.map((testcase, index) => (
          <Testcase
            isSelected={selectedTestcaseIdx === index}
            onSelected={setSelectedTestcaseIdx}
            testcase={testcase}
            index={index}
            key={testcase.id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
}
