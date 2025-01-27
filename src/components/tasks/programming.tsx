import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { File, ProgrammingTask } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Testcase from "@/features/problems/components/tasks/testcase";

export function Programming({ task }: { task: ProgrammingTask }) {
  const [selectedTestcaseIdx, setSelectedTestcaseIdx] = useState<number | null>(
    null,
  );

  const { register, handleSubmit } = useForm();

  // NOTE: Assume that all required inputs are files
  const requiredInputs: { id: string; name: string }[] =
    task.required_inputs.map((input) => ({
      id: input.id,
      name: (input.data as File).name,
    }));

  const submitForm: SubmitHandler<FieldValues> = (formData) => {
    console.log(formData);
  };

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
    </div>
  );
}
