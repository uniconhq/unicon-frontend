import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

import { SubmissionORM } from "@/api";
import { DataTable } from "@/components/ui/data-table";
import { getAllSubmissions } from "@/features/definitions/queries";

const columns: ColumnDef<SubmissionORM>[] = [
  {
    accessorKey: "id",
    header: "Submission ID",
  },
  {
    accessorKey: "definition",
    header: "Contest ID",
    cell: ({ row }) => {
      const contestId = row.original.problem_id;
      return (
        <Link
          to={`/contests/${contestId}`}
          className="font-mono hover:text-purple-300 hover:underline"
        >
          #{contestId}
        </Link>
      );
    },
  },
  {
    accessorKey: "submitted_at",
    header: "Submitted At",
    cell: ({ row }) => {
      return new Date(row.original.submitted_at).toLocaleString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Link
          to={`/submissions/${id}`}
          className="hover:text-purple-300 hover:underline"
        >
          View Results
        </Link>
      );
    },
  },
];

const Submissions = () => {
  const { data, isLoading } = useQuery(getAllSubmissions());

  return (
    <div className="flex w-full flex-col gap-8 p-4 px-8">
      <h1 className="text-2xl font-semibold">Submissions</h1>
      {!isLoading && data && <DataTable data={data} columns={columns} />}
    </div>
  );
};

export default Submissions;
