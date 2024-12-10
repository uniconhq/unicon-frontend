import { useQuery } from "@tanstack/react-query";

import { getAllProjectSubmissions } from "@/features/definitions/queries";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import SubmissionsTable from "@/features/projects/table/submissions/submissions-table";

const Submissions = () => {
  const projectId = useProjectId();
  const { data, isLoading } = useQuery(getAllProjectSubmissions(projectId));

  return (
    <div className="flex w-full flex-col gap-8 p-4 px-8">
      <h1 className="text-2xl font-semibold">Submissions</h1>
      {!isLoading && data && <SubmissionsTable data={data} />}
    </div>
  );
};

export default Submissions;
