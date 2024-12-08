import { useQuery } from "@tanstack/react-query";
import { Params, useParams } from "react-router-dom";

import {
  getProjectById,
  getProjectUsersById,
} from "@/features/projects/queries";
import UsersTable from "@/features/projects/table/users/users-table";

const ProjectRoles = () => {
  const { id } = useParams<Params<"id">>();
  const { data: project, isLoading } = useQuery(getProjectById(Number(id)));
  const { data: users, isLoading: isLoadingUsers } = useQuery(
    getProjectUsersById(Number(id)),
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
        <h2 className="text-2xl font-semibold">Users</h2>
      </div>
      <div className="flex flex-col gap-4">
        {!isLoadingUsers && users && <UsersTable data={users} />}
      </div>
    </div>
  );
};

export default ProjectRoles;
