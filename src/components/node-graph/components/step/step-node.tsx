import { useContext } from "react";
import { GoDotFill } from "react-icons/go";

import { StepSocket } from "@/api";
import {
  GraphContext,
  GraphDispatchContext,
} from "@/features/problems/components/tasks/graph-context";
import { Step } from "@/features/problems/components/tasks/types";
import { StepNodeColorMap } from "@/lib/colors";
import { cn } from "@/lib/utils";

import { NodeSlot, NodeSlotGroup } from "../node-slot";
import StepMetadata from "./step-metadata";

export function StepNode({ data }: { data: Step }) {
  const { isEditing } = useContext(GraphContext)!;
  const dispatch = useContext(GraphDispatchContext)!;

  const handleEditSocketId = (oldSocketId: string) => (newSocketId: string) => {
    dispatch({
      type: "UPDATE_STEP_SOCKET_ID",
      stepId: data.id,
      oldSocketId,
      newSocketId,
      isInput: data.inputs.some((socket) => socket.id === oldSocketId),
    });
  };

  return (
    <div
      className={cn(
        "flex min-w-52 flex-col rounded bg-[#141414] pb-2 font-mono text-slate-300 outline outline-[0.08rem] outline-neutral-500",
      )}
    >
      {/* Node header */}
      <div className="flex items-center gap-1 rounded-t py-2 pl-1 pr-4 font-medium uppercase">
        <GoDotFill
          style={{ color: `${StepNodeColorMap[data.type]}` }}
          className="h-5 w-5"
        />
        {data.type}
      </div>
      {/* Node metadata */}
      <StepMetadata step={data} />
      {/* Node body */}

      {!["OUTPUT_STEP", "INPUT_STEP"].includes(data.type) && (
        <div className="text-xs font-light">
          <div className="flex flex-row justify-between">
            <NodeSlotGroup>
              {data.inputs.map((stepSocket: StepSocket) => (
                <NodeSlot
                  key={stepSocket.id}
                  id={stepSocket.id}
                  label={stepSocket.id}
                  type="target"
                  isEditable={isEditing}
                  onEditSocketId={handleEditSocketId(stepSocket.id)}
                />
              ))}
            </NodeSlotGroup>
            <NodeSlotGroup>
              {data.outputs.map((stepSocket: StepSocket) => (
                <NodeSlot
                  key={stepSocket.id}
                  id={stepSocket.id}
                  label={stepSocket.id}
                  type="source"
                  isEditable={isEditing}
                  onEditSocketId={handleEditSocketId(stepSocket.id)}
                />
              ))}
            </NodeSlotGroup>
          </div>
        </div>
      )}
    </div>
  );
}
