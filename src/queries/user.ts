import { queryOptions } from "@tanstack/react-query";

import { getUser } from "@/api";
import { QueryKeys } from "@/features/definitions/queries";

export const getUserProfile = () => {
  return queryOptions({
    queryKey: [QueryKeys.UserProfile],
    queryFn: () =>
      getUser({ withCredentials: true }).then((response) => response.data),
  });
};
