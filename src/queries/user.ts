import { queryOptions } from "@tanstack/react-query";
import { QueryKeys } from "./utils/query-keys";
import { getUserAuthSessionGet } from "@/api";

export const getUserProfile = () => {
  return queryOptions({
    queryKey: [QueryKeys.UserProfile],
    queryFn: () =>
      getUserAuthSessionGet({ withCredentials: true }).then(
        (data) => data.data,
      ),
  });
};
