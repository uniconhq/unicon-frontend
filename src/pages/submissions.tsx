import { useQuery } from "@tanstack/react-query";

import { getAllProjectSubmissions } from "@/features/problems/queries";
import { useProjectId } from "@/features/projects/hooks/use-id";
import { getProjectById } from "@/features/projects/queries";
import SubmissionsTable from "@/features/projects/table/submissions/submissions-table";

const Submissions = () => {
  const projectId = useProjectId();
  const { data: project } = useQuery(getProjectById(Number(projectId)));
  const { data, isLoading } = useQuery(getAllProjectSubmissions(projectId));

  if (!project) {
    return;
  }

  const showUser =
    project.view_others_submission || project.view_supervised_submission;
  return (
    <div className="flex w-full flex-col gap-8 px-8 py-6">
      <h1 className="text-2xl font-semibold">Submissions</h1>
      {!isLoading && data && (
        <SubmissionsTable data={data} showUser={showUser} />
      )}
    </div>
  );
};

export default Submissions;
