import qs from "qs";
import { Params } from "react-router-dom";

import { getProblem, getProject } from "@/api";
import { client } from "@/api/client.gen";

client.setConfig({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  paramsSerializer: (params) => {
    return qs.stringify(params, { indices: false });
  },
});

export const projectLoader = async ({
  params,
}: {
  params: Params<"projectId">;
}) => {
  const { projectId: id } = params;
  try {
    const response = await getProject({ path: { id: Number(id) } });
    console.log({ response });
    return response.data;
  } catch (error) {
    console.error("Error fetching project data", error);
    throw new Response("Failed to load project", { status: 500 });
  }
};

export const problemLoader = async ({
  params,
}: {
  params: Params<"problemId">;
}) => {
  const { problemId: id } = params;
  try {
    const response = await getProblem({ path: { id: Number(id) } });
    console.log({ response });
    return response.data;
  } catch (error) {
    console.error("Error fetching problem data", error);
    throw new Response("Failed to load problem", { status: 500 });
  }
};
