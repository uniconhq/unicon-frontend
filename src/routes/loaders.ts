import qs from "qs";
import { Params } from "react-router-dom";

import { getGroup, getProblem, getProject } from "@/api";
import { client } from "@/api";

client.setConfig({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  paramsSerializer: (params) => {
    return qs.stringify(params, { indices: false });
  },
  throwOnError: true,
});

export const projectLoader = async ({
  params,
}: {
  params: Params<"projectId">;
}) => {
  const { projectId: id } = params;
  const response = await getProject({ path: { id: Number(id) } });
  return response.data;
};

export const problemLoader = async ({
  params,
}: {
  params: Params<"problemId">;
}) => {
  const { problemId: id } = params;
  const response = await getProblem({ path: { id: Number(id) } });
  return response.data;
};

export const groupLoader = async ({
  params,
}: {
  params: Params<"groupId">;
}) => {
  const { groupId: id } = params;
  const response = await getGroup({ path: { id: Number(id) } });
  return response.data;
};
