import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useProjectId } from "@/features/projects/hooks/use-id";
import {
  getProjectById,
  getProjectRolesById,
} from "@/features/projects/queries";
import RolesTable from "@/features/projects/table/roles/roles-table";

const ProjectRoles = () => {
  const id = useProjectId();
  const { data: project, isLoading } = useQuery(getProjectById(Number(id)));
  const { data: roles, isLoading: isLoadingRoles } = useQuery(
    getProjectRolesById(id),
  );

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
        <h2 className="text-2xl font-semibold">Roles</h2>
        <Link to={`/projects/${id}/roles/new`} className="flex gap-1">
          <Button variant="ghost" className="hover:text-purple-300">
            <Plus /> New Role
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {!isLoadingRoles && roles && <RolesTable data={roles} />}
      </div>
    </div>
  );
};

export default ProjectRoles;
