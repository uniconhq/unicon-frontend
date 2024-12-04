import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Link, Params, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import DefinitionsTable from "@/features/definitions/table/definitions-table";
import { getProjectById } from "@/features/projects/queries";

const Project = () => {
  const { id } = useParams<Params<"id">>();
  const { data: project, isLoading } = useQuery(getProjectById(Number(id)));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Something went wrong.</div>;
  }

  return (
    <div className="m-auto flex w-full max-w-5xl flex-col gap-8 p-4 px-8">
      <div className="flex flex-col">
        <h2 className="text-3xl font-semibold">{project.name}</h2>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Problems</h2>
        <Link to={`/projects/${id}/problems/new`} className="flex gap-1">
          <Button variant="ghost" className="hover:text-purple-300">
            <Plus /> New Problem
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <DefinitionsTable data={project.problems} />
      </div>
    </div>
  );
};

export default Project;
