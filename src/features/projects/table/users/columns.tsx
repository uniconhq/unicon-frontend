import { ColumnDef } from "@tanstack/react-table";

import { UserPublicWithRoles } from "@/api";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<UserPublicWithRoles>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    cell: ({ row }) => {
      const role = row.original.roles[0]?.name;
      return <Badge>{role}</Badge>;
    },
    header: "Role",
  },
];
