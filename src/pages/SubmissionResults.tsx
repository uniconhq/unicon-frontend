import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import TaskResult from "@/components/tasks/submission-results/TaskResult";
import { Button } from "@/components/ui/button";
import { getSubmissionById } from "@/features/definitions/queries";

const SubmissionResults = () => {
  const { id } = useParams<{ id: string }>();

  const [pending, setPending] = useState(true);

  const { data: submission } = useQuery({
    ...getSubmissionById(Number(id)),
    refetchInterval: pending ? 5000 : false,
  });

  const tasks = submission?.task_results;

  useEffect(() => {
    if (tasks && pending && tasks.every((task) => task.status !== "PENDING")) {
      setPending(false);
    }
  }, [tasks, pending]);

  const contest_id: number = tasks ? tasks[0].definition_id : 0;

  return (
    <div className="flex w-full flex-col gap-8 py-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">Submission (#{id})</h1>
        <Link to={`/contests/${contest_id}`}>
          <Button
            variant="outline"
            className="font-mono text-sm hover:text-purple-500"
          >
            CONTEST #{contest_id}
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        {tasks?.map((taskResult) => (
          <TaskResult key={taskResult.task_id} taskResult={taskResult} />
        ))}
      </div>
    </div>
  );
};

export default SubmissionResults;
