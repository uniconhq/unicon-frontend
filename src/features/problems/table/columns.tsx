import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

import { ProblemOrm } from "@/api";

export const columns: ColumnDef<ProblemOrm>[] = [
  {
    accessorKey: "id",
    header: "Problem ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Link
          to={`/projects/${row.original.project_id}/problems/${id}`}
          className="hover:text-purple-300 hover:underline"
        >
          View
        </Link>
      );
    },
  },
];
