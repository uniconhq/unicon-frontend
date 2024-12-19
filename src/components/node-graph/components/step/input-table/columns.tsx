import { ColumnDef } from "@tanstack/react-table";

import { StepSocket } from "@/api";

import { NodeSlot } from "../../node-slot";

export const columns: ColumnDef<StepSocket>[] = [
  {
    accessorFn: (row) => row.id.replace(/^DATA\.OUT\./, ""),
    header: "Socket ID",
  },
  {
    header: "Value",
    cell: ({ row }) => {
      const data = row.original.data;
      const isFile = data instanceof File;
      return <div>{isFile ? "View more" : JSON.stringify(data)}</div>;
    },
  },
  {
    id: "handle",
    header: "",
    cell: ({ row }) => {
      const id = row.original.id;
      return <NodeSlot key={id} id={id} label="" type="source" hideLabel />;
    },
  },
];
