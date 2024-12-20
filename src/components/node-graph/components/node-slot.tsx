import { Handle, HandleType, Position as HandlePosition } from "@xyflow/react";
import { useState } from "react";
import { twJoin } from "tailwind-merge";
import { useDebouncedCallback } from "use-debounce";

import { cn } from "@/lib/utils";

interface NodeSlotProps {
  id: string;
  label: string;
  type: HandleType;
  hideLabel?: boolean;
  isEditable?: boolean;
  onEditSocketId?: (socketId: string) => void;
}

export function NodeSlot({
  id,
  type,
  hideLabel = false,
  isEditable = false,
  onEditSocketId,
}: NodeSlotProps) {
  const [slotType, slotDirection, ...name] = id.split(".");
  const isControl = slotType === "CONTROL";

  const [displayName, setDisplayName] = useState(name.join("."));
  const handleEditSocketId = useDebouncedCallback((newSocketId: string) => {
    if (onEditSocketId) {
      onEditSocketId(newSocketId);
    }
  }, 500);

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
      {!hideLabel &&
        (isEditable && !isControl ? (
          <input
            type="text"
            className={cn("inline max-w-fit bg-transparent text-xs", {
              "text-right": type === "source",
            })}
            value={displayName}
            onChange={(e) => {
              const newSocketId = [
                slotType,
                slotDirection,
                e.target.value,
              ].join(".");
              handleEditSocketId(newSocketId);
              setDisplayName(e.target.value);
            }}
            size={displayName.length}
          />
        ) : (
          <span className="text-xs">
            {name.length ? name.join(".") : `${slotType}.${slotDirection}`}
          </span>
        ))}
    </div>
  );
}

export function NodeSlotGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex grow-0 flex-col">{children}</div>;
}
