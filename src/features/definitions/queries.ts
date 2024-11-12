import { queryOptions, useMutation } from "@tanstack/react-query";

import {
  Definition,
  getDefinition,
  getDefinitions,
  submitDefinition,
} from "@/api";

export enum QueryKeys {
  UserProfile = "user_profile",
  Definitions = "definitions",
  Definition = "definition",
  Submissions = "submissions",
}

export const getAllDefinitions = () => {
  return queryOptions({
    queryKey: [QueryKeys.Definitions],
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
    queryKey: [QueryKeys.Definition, id],
    queryFn: () =>
      getDefinition({ path: { id } }).then((response) => response.data),
  });
};
