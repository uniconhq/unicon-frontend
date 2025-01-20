import { ColumnDef } from "@tanstack/react-table";

import { InputStep, StepSocket } from "@/api";
import { isFile } from "@/lib/types";

import { NodeSlot } from "../../node-slot";
import ViewFileButton from "./view-file-button";

export const columns: ColumnDef<StepSocket & { step: InputStep }>[] = [
  {
    accessorFn: (row) => row.id.replace(/^DATA\.OUT\./, ""),
    header: "Socket ID",
  },
  {
    header: "Value",
    cell: ({ row }) => {
      const data = row.original.data;
      return (
        <div>
          {data && isFile(data) ? (
            <ViewFileButton socket={row.original} step={row.original.step} />
          ) : (
            JSON.stringify(data)
          )}
        </div>
      );
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
