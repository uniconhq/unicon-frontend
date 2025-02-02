import { Label } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ProgrammingTask } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getTaskAttemptResults,
  useCreateTaskAttempt,
} from "@/features/problems/queries";

import TaskResultCard from "./submission-results/task-result";

const DEFAULT_REFETCH_INTERVAL: number = 5000;

export function ProgrammingSubmitForm({
  problemId,
  task,
}: {
  problemId: number;
  task: ProgrammingTask;
}) {
  const { register, handleSubmit } = useForm();

  const createTaskAttemptMutation = useCreateTaskAttempt(problemId, task.id);
  const { data: taskAttemptResults, refetch } = useQuery({
    ...getTaskAttemptResults(problemId, task.id),
    refetchInterval: ({ state: { data } }) =>
      // Only refetch if there is a pending task result
      data?.some((taskAttempt) =>
        taskAttempt.task_results.some((result) => result.status == "PENDING"),
      )
        ? DEFAULT_REFETCH_INTERVAL
        : false,
  });

  const [selectedAttemptIdx, setSelectedAttemptIdx] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (taskAttemptResults?.length) {
      setSelectedAttemptIdx(taskAttemptResults.length - 1);
    }
  }, [taskAttemptResults]);

  // NOTE: Assume that all required inputs are files
  const requiredInputs: { id: string; name: string }[] =
    task.required_inputs.map((input) => ({
      id: input.id,
      name: (input.data as unknown as File).name,
    }));

  const submitForm: SubmitHandler<Record<string, FileList>> = (formData) => {
    Promise.all(
      requiredInputs.map(async ({ id, name }) => {
        const file = formData[id.replace(/\./g, "_")];
        const content = await file[0].text();
        return { id, data: { name, content } };
      }),
    ).then((files) => {
      createTaskAttemptMutation.mutate(
        {
          task_id: task.id,
          value: files,
        },
        {
          onSuccess: () => refetch(),
        },
      );
    });
  };

  return (
    <>
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
      <div className="relative flex flex-col gap-4">
        <Select
          onValueChange={(value) => setSelectedAttemptIdx(+value)}
          disabled={!taskAttemptResults?.length}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an attempt" />
          </SelectTrigger>
          <SelectContent>
            {taskAttemptResults?.reverse().map((taskAttempt, index) => (
              <SelectItem
                key={taskAttempt.id}
                value={`${taskAttemptResults.length - index - 1}`}
              >
                Attempt #{taskAttemptResults.length - index}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedAttemptIdx !== null && taskAttemptResults?.length ? (
          <TaskResultCard
            key={taskAttemptResults[selectedAttemptIdx].id}
            title={`Attempt ${selectedAttemptIdx + 1}`}
            taskAttempt={{
              ...taskAttemptResults[selectedAttemptIdx],
              task: {
                ...task,
                problem_id: problemId,
                autograde: task.autograde ?? false,
                other_fields: { ...task },
              },
            }}
          />
        ) : null}
      </div>
    </>
  );
}

export default ProgrammingSubmitForm;
