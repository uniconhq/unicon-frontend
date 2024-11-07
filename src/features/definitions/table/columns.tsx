import { BaseDefinitionDTO } from "@/api";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export const columns: ColumnDef<BaseDefinitionDTO>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
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
          view
        </Link>
      );
    },
  },
];
