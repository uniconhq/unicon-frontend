import { getDefinitionsContestsDefinitionsGet } from "@/client";
import { QueryKeys } from "@/queries/utils/query-keys";
import { queryOptions } from "@tanstack/react-query";

export const getDefinitions = () => {
  return queryOptions({
    queryKey: [QueryKeys.Definitions],
    queryFn: () =>
      getDefinitionsContestsDefinitionsGet().then((response) => response.data),
  });
};
