import { ColumnDef } from "@tanstack/react-table";

import { SubmissionPublic } from "@/api";

import ViewProblemButton from "./view-problem-button";
import ViewResultButton from "./view-result-button";

export const columns: ColumnDef<SubmissionPublic>[] = [
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
      // This should happen if the submission is not submitted yet
      if (!row.original.submitted_at) {
        return "-";
      }
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
