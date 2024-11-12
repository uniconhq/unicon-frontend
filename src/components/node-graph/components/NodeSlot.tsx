import { Handle, HandleType, Position as HandlePosition } from "@xyflow/react";
import { twJoin } from "tailwind-merge";

interface NodeSlotProps {
  id: string;
  label: string;
  type: HandleType;
}

export function NodeSlot({ id, label, type }: NodeSlotProps) {
  return (
    <div
      className={twJoin(
        "my-1 flex items-center space-x-2",
        type === "source" && "flex-row-reverse space-x-reverse",
      )}
    >
      <Handle
        style={{ border: "0", position: "static" }} // NOTE: Override default position to use flex positioning
        className={twJoin(
          "h-4 w-2 bg-neutral-700",
          type === "target" && "rounded-bl-full rounded-tl-full",
          type === "source" && "rounded-br-full rounded-tr-full",
        )}
        id={id}
        type={type}
        position={
          type === "target" ? HandlePosition.Left : HandlePosition.Right
        }
      />
      <span>{label}</span>
    </div>
  );
}

export function NodeSlotGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex grow-0 flex-col">{children}</div>;
}
