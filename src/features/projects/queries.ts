import { queryOptions, useMutation } from "@tanstack/react-query";

import {
  createProject,
  getAllProjects,
  getProject,
  joinProject,
  ProjectCreate,
} from "@/api";

export enum ProjectQueryKeys {
  Project = "Project",
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
