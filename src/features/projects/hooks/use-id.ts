import { useParams } from "react-router-dom";

export const useOrganisationId = () => {
  const { organisationId: organisationIdStr } = useParams<"organisationId">();
  return parseInt(organisationIdStr!);
};

export const useProjectId = () => {
  const { projectId: projectIdStr } = useParams<"projectId">();
  return parseInt(projectIdStr!);
};

export const useProblemId = () => {
  const { problemId: idStr } = useParams<"problemId">();
  return parseInt(idStr!);
};

export const useGroupId = () => {
  const { groupId: groupIdStr } = useParams<"groupId">();
  return parseInt(groupIdStr!);
};

export const useTaskId = () => {
  const { taskId: idStr } = useParams<"taskId">();
  return parseInt(idStr!);
};
