import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSubmissionById } from "@/features/definitions/queries";
import { cn } from "@/lib/utils";

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

const SubmissionResults = () => {
  const { id } = useParams<{ id: string }>();

  const [pending, setPending] = useState(true);

  const { data } = useQuery({
    ...getSubmissionById(Number(id)),
    refetchInterval: pending ? 5000 : false,
  });

  useEffect(() => {
    if (data && pending && data.every((task) => task.status !== "PENDING")) {
      setPending(false);
    }
  }, [data, pending]);

  const contest_id: number = data ? data[0].definition_id : 0;

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
        {data?.map((taskResult) => (
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
                  Task #{taskResult.task_id + 1}
                </span>
              </CardTitle>
              {taskResult.status != "SKIPPED" && (
                <CardDescription className="flex flex-col gap-1 py-2 font-mono text-sm">
                  <span>STARTED: {parseDateTime(taskResult.started_at)}</span>
                  {taskResult.completed_at && (
                    <span>
                      FINISHED: {parseDateTime(taskResult.completed_at)}
                    </span>
                  )}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="flex flex-col gap-2 font-mono">
              {taskResult.status == "SKIPPED" ? (
                <span className="text-gray-300">
                  Manual grading is required!
                </span>
              ) : (
                taskResult.result && (
                  <pre className="whitespace-pre-wrap rounded-md bg-gray-900 p-4 text-gray-100">
                    {JSON.stringify(taskResult.result, null, 2)}
                  </pre>
                )
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubmissionResults;
