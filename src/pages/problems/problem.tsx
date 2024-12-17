import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Link, type Params, useParams } from "react-router-dom";

import { Task } from "@/components/tasks/task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProblemById } from "@/features/problems/queries";

const Problem = () => {
  const { id, projectId } = useParams<Params<"id" | "projectId">>();
  const { data } = useQuery(getProblemById(Number(id)));
  const submitLink = `/projects/${projectId}/problems/${id}/submit`;

  return (
    <div className="flex w-full flex-col gap-8 py-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {data?.name} (#{id})
          </h1>
          <h2 className="mt-4 font-light">{data?.description}</h2>
        </div>
        <Link to={submitLink} className="flex gap-1">
          <Button variant="ghost" className="hover:text-purple-300">
            <Plus /> New Submission
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        {data?.tasks.map((task, index) => (
          <Card key={index} className="bg-inherit">
            <CardHeader>
              <CardTitle className="flex items-center gap-4 font-mono">
                <span className="text-lg font-medium">Task #{task.id + 1}</span>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="rounded-md border border-blue-700 p-2">
                    {task.type}
                  </span>
                  {task.autograde && (
                    <span className="rounded-md border border-green-700 p-2">
                      Autograded
                    </span>
                  )}
                </div>
              </CardTitle>
              <CardContent className="p-0 py-2">
                <Task task={task} />
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Problem;
