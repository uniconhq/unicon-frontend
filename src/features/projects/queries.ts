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
  joinProject,
  ProjectCreate,
} from "@/api";

export enum ProjectQueryKeys {
  Project = "Project",
  Role = "Role",
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
