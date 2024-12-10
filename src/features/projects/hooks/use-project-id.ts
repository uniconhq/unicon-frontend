import { useParams } from "react-router-dom";

export const useProjectId = () => {
  const { projectId: projectIdStr } = useParams<"projectId">();
  return parseInt(projectIdStr!);
};
