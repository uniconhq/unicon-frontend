import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { File, InputStep, ProgrammingTask } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Testcase from "@/features/problems/components/tasks/testcase";
import {
  getTaskAttemptResults,
  useCreateTaskAttempt,
} from "@/features/problems/queries";

import TaskResultCard from "./submission-results/task-result";

export function Programming({
  problemId,
  task,
}: {
  submit: boolean;
  problemId: number;
  task: ProgrammingTask;
}) {
  const { register, handleSubmit } = useForm();
  const createTaskAttemptMutation = useCreateTaskAttempt(problemId, task.id);
  const { data: taskAttemptResults } = useQuery({
    ...getTaskAttemptResults(problemId, task.id),
    refetchInterval: 5000,
  });

  // NOTE: Assume that all required inputs are files
  const requiredInputs: { id: string; name: string }[] =
    task.required_inputs.map((input) => ({
      id: input.id,
      name: (input.data as File).name,
    }));

  const submitForm: SubmitHandler<Record<string, FileList>> = (formData) => {
    Promise.all(
      requiredInputs.map(async ({ id, name }) => {
        const file = formData[id.replace(/\./g, "_")];
        const content = await file[0].text();
        return { id, data: { name, content } };
      }),
    ).then((files) => {
      createTaskAttemptMutation.mutate({
        task_id: task.id,
        value: files,
      });
    });
  };

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
      <span className="text-xs font-medium text-gray-300">SUBMISSION</span>
      <form onSubmit={handleSubmit(submitForm)}>
        {requiredInputs.map(({ id, name }) => (
          <div
            key={id}
            className="mt-2 grid w-full max-w-sm items-center gap-2"
          >
            <Label className="text-md font-mono">{name}</Label>
            <Input
              {...register(id.replace(/\./g, "_"), { required: true })}
              id={id}
              type="file"
            />
          </div>
        ))}
        <Button className="mt-6" type="submit">
          Submit
        </Button>
      </form>
      <span className="text-xs font-medium text-gray-300">RESULTS</span>
      <div className="flex flex-col gap-2">
        {taskAttemptResults
          ?.sort((r1, r2) => r2.id - r1.id) // Descending order of task attempts
          .map(
            (taskAttempt) =>
              taskAttempt.task_results.length > 0 && (
                <TaskResultCard
                  key={taskAttempt.id}
                  title={`Attempt #${taskAttempt.id}`}
                  taskAttempt={{
                    ...taskAttempt,
                    task: {
                      ...task,
                      problem_id: problemId,
                      autograde: task.autograde ?? false,
                      other_fields: { ...task },
                    },
                  }}
                />
              ),
          )}
      </div>
    </div>
  );
}
