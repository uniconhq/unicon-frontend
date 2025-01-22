import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createInvitationKey,
  createProject,
  deleteInvitationKey,
  getAllProjects,
  getProject,
  getProjectRoles,
  getProjectUsers,
  joinProject,
  ProjectCreate,
  RolePublic,
  updateRole,
} from "@/api";

export enum ProjectQueryKeys {
  Project = "Project",
  Role = "Role",
  User = "User",
}

export const getProjects = () => {
  return queryOptions({
    queryKey: [ProjectQueryKeys.Project],
    queryFn: () => getAllProjects().then((response) => response.data),
  });
};

export const getProjectById = (id: number) => {
  return queryOptions({
    queryKey: [ProjectQueryKeys.Project, id],
    queryFn: () =>
      getProject({ path: { id } }).then((response) => response.data),
  });
};

export const getProjectRolesById = (id: number) => {
  return queryOptions({
    queryKey: [ProjectQueryKeys.Project, id, ProjectQueryKeys.Role],
    queryFn: () =>
      getProjectRoles({ path: { id } }).then((response) => response.data),
  });
};

export const getProjectUsersById = (id: number) => {
  return queryOptions({
    queryKey: [ProjectQueryKeys.Project, id, ProjectQueryKeys.User],
    queryFn: () =>
      getProjectUsers({ path: { id } }).then((response) => response.data),
  });
};

export const useCreateProject = (id: number) => {
  return useMutation({
    mutationFn: (data: ProjectCreate) =>
      createProject({ body: data, path: { id } }),
  });
};

export const useJoinProject = () => {
  return useMutation({
    mutationFn: (key: string) => joinProject({ path: { key } }),
  });
};

export const useCreateInvitationKey = (projectId: number, roleId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => createInvitationKey({ path: { id: roleId } }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [ProjectQueryKeys.Project, projectId],
      }),
  });
};

export const useDeleteInvitationKey = (projectId: number, roleId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteInvitationKey({ path: { id: roleId } }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [ProjectQueryKeys.Project, projectId],
      }),
  });
};

export const useUpdateRoles = (projectId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (roles: Omit<RolePublic, "project_id">[]) =>
      Promise.all(
        roles.map((role) => updateRole({ body: role, path: { id: role.id } })),
      ),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [ProjectQueryKeys.Project, projectId, ProjectQueryKeys.Role],
      }),
  });
};
