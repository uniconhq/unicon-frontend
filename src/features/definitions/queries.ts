import { queryOptions, useMutation } from "@tanstack/react-query";

import {
  ContestSubmission,
  Definition,
  getDefinition,
  getDefinitions,
  getSubmission,
  submitContestSubmission,
  submitDefinition,
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

export const useCreateDefinition = () => {
  return useMutation({
    mutationFn: (data: Definition) => submitDefinition({ body: data }),
  });
};

export const getDefinitionById = (id: number) => {
  return queryOptions({
    queryKey: [ContestQueryKeys.Definition, id],
    queryFn: () =>
      getDefinition({ path: { id } }).then((response) => response.data),
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
