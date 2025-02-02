import { useState } from "react";

import { InputStep, ProgrammingTask } from "@/api";
import Testcase from "@/features/problems/components/tasks/testcase";

import ProgrammingSubmitForm from "./programming-submit";

export function Programming({
  submit,
  problemId,
  task,
}: {
  submit: boolean;
  problemId: number;
  task: ProgrammingTask;
}) {
  const userInput: InputStep = {
    id: 0,
    type: "INPUT_STEP",
    inputs: [],
    outputs: task.required_inputs,
  };

  const [selectedTestcaseIdx, setSelectedTestcaseIdx] = useState<number | null>(
    task.testcases.length ? 0 : null,
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
            edit={false}
            key={testcase.id}
            index={index}
            testcase={testcase}
            userInput={userInput}
            isSelected={selectedTestcaseIdx === index}
            onSelected={setSelectedTestcaseIdx}
          />
        ))}
      </div>
      {submit && <ProgrammingSubmitForm problemId={problemId} task={task} />}
    </div>
  );
}
