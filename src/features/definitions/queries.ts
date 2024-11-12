import { queryOptions, useMutation } from "@tanstack/react-query";

import {
  Definition,
  getDefinition,
  getDefinitions,
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
