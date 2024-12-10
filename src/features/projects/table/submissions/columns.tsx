import { ColumnDef } from "@tanstack/react-table";

import { SubmissionORM } from "@/api";

import ViewProblemButton from "./view-problem-button";
import ViewResultButton from "./view-result-button";

export const columns: ColumnDef<SubmissionORM>[] = [
  {
    accessorKey: "id",
    header: "Submission ID",
  },
  {
    accessorKey: "definition",
    header: "Problem ID",
    cell: ({ row }) => {
      const problemId = row.original.problem_id;
      return <ViewProblemButton problemId={problemId} />;
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
      return <ViewResultButton submissionId={id} />;
    },
  },
];
