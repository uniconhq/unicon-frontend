import {
  Handle,
  HandleType,
  Position as HandlePosition,
  useNodeConnections,
} from "@xyflow/react";
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
  onEditSocketId?: (socketId: string) => void;
  onDeleteSocket?: () => void;
  style?: React.CSSProperties;
}

export function NodeSlot({
  id,
  type,
  hideLabel = false,
  edit = false,
  onEditSocketId,
  onDeleteSocket,
  style,
}: NodeSlotProps) {
  const [slotType] = id.split(".");
  const isControl = slotType === "CONTROL";
  const handleEditSocketId = (newSocketId: string) => {
    if (onEditSocketId) {
      onEditSocketId(newSocketId);
    }
  };

  const connections = useNodeConnections({
    handleType: type,
    handleId: id,
  });
  const hasConnections = connections.length > 0;

  return (
    <div
      className={twJoin(
        "relative my-1 flex items-center space-x-2",
        type === "source" && "flex-row-reverse space-x-reverse",
      )}
    >
      <Handle
        style={{
          width: "12px",
          height: "12px",
          backgroundColor: hasConnections ? "white" : "black",
          border: "1px solid white",
          ...(style ?? {}),
        }} // NOTE: Override default position to use flex positioning
        className={twJoin(
          "bg-neutral-700",
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
        (edit && !isControl ? (
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
            <Button
              size={"sm"}
              className="h-fit w-fit px-1 py-1"
              variant={"secondary"}
              onClick={onDeleteSocket}
              type="button"
            >
              <Trash className="h-2 w-2" />
            </Button>
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
