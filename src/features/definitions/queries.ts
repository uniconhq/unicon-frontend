import { queryOptions, useMutation } from "@tanstack/react-query";

import {
  ContestSubmission,
  createProblem,
  Definition,
  getDefinition,
  getDefinitions,
  getSubmission,
  getSubmissions,
  submitContestSubmission,
} from "@/api";

export enum ContestQueryKeys {
  Definitions = "definitions",
  Definition = "definition",
  Submissions = "submissions",
}

export const getAllDefinitions = () => {
  return queryOptions({
    queryKey: [ContestQueryKeys.Definitions],
    queryFn: () => getDefinitions().then((response) => response.data),
  });
};

export const useCreateProblem = (project_id: number) => {
  return useMutation({
    mutationFn: (data: Definition) =>
      createProblem({ body: data, path: { id: project_id } }),
  });
};

export const getDefinitionById = (id: number) => {
  return queryOptions({
    queryKey: [ContestQueryKeys.Definition, id],
    queryFn: () =>
      getDefinition({ path: { id } }).then((response) => response.data),
  });
};

export const getAllSubmissions = () => {
  return queryOptions({
    queryKey: [ContestQueryKeys.Submissions],
    queryFn: () => getSubmissions().then((response) => response.data),
  });
};

export const getSubmissionById = (id: number) => {
  return queryOptions({
    queryKey: [ContestQueryKeys.Submissions, id],
    queryFn: () =>
      getSubmission({ path: { submission_id: id } }).then(
        (response) => response.data,
      ),
  });
};

export const useCreateSubmission = (definitionId: number) => {
  return useMutation({
    mutationFn: (data: ContestSubmission) =>
      submitContestSubmission({ body: data, path: { id: definitionId } }),
  });
};
