import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

import { ProblemORM } from "@/api";

export const columns: ColumnDef<ProblemORM>[] = [
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
          to={`/contests/${id}`}
          className="hover:text-purple-300 hover:underline"
        >
          View
        </Link>
      );
    },
  },
];
