import { Handle, HandleType, Position as HandlePosition } from "@xyflow/react";
import { Trash } from "lucide-react";
import { twJoin } from "tailwind-merge";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import NodeInput from "./step/node-input";

interface NodeSlotProps {
  id: string;
  label: string;
  type: HandleType;
  hideLabel?: boolean;
  edit?: boolean;
  allowEditSockets?: boolean;
  onEditSocketId?: (socketId: string) => void;
  onDeleteSocket?: () => void;
}

export function NodeSlot({
  id,
  type,
  hideLabel = false,
  edit = false,
  allowEditSockets = true,
  onEditSocketId,
  onDeleteSocket,
}: NodeSlotProps) {
  const [slotType] = id.split(".");
  const isControl = slotType === "CONTROL";

  const handleEditSocketId = (newSocketId: string) => {
    if (onEditSocketId) {
      onEditSocketId(newSocketId);
    }
  };

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
        (edit && allowEditSockets && !isControl ? (
          <div
            className={cn("flex grow justify-between gap-2", {
              "flex-row-reverse space-x-reverse": type === "source",
            })}
          >
            <NodeInput
              className={[
                {
                  "text-right": type === "source",
                },
              ]}
              value={id}
              onChange={(newValue) => {
                handleEditSocketId(newValue);
              }}
            />
            {allowEditSockets && (
              <Button
                size={"sm"}
                className="h-fit w-fit px-1 py-1"
                variant={"secondary"}
                onClick={onDeleteSocket}
                type="button"
              >
                <Trash className="h-2 w-2" />
              </Button>
            )}
          </div>
        ) : (
          <span className="text-xs">{id}</span>
        ))}
    </div>
  );
}

export function NodeSlotGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex grow-0 flex-col">{children}</div>;
}
