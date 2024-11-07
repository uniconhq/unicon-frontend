import {
  Definition,
  getDefinitionsContestsDefinitionsGet,
  submitDefinitionContestsDefinitionsPost,
} from "@/api";
import { QueryKeys } from "@/queries/utils/query-keys";
import { queryOptions, useMutation } from "@tanstack/react-query";

export const getDefinitions = () => {
  return queryOptions({
    queryKey: [QueryKeys.Definitions],
    queryFn: () =>
      getDefinitionsContestsDefinitionsGet().then((response) => response.data),
  });
};

export const useCreateDefinition = () => {
  return useMutation({
    mutationFn: (data: Definition) => {
      return submitDefinitionContestsDefinitionsPost({
        body: data,
      });
    },
  });
};
