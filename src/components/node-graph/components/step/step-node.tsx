import { Plus, Trash } from "lucide-react";
import { useCallback, useContext } from "react";
import { GoDotFill } from "react-icons/go";

import { StepSocket } from "@/api";
import { Button } from "@/components/ui/button";
import {
  GraphActionType,
  GraphContext,
  GraphDispatchContext,
  SocketType,
} from "@/features/problems/components/tasks/graph-context";
import { Step } from "@/features/problems/components/tasks/types";
import { StepNodeColorMap } from "@/lib/colors";
import { cn } from "@/lib/utils";

import { NodeSlot, NodeSlotGroup } from "../node-slot";
import StepMetadata from "./metadata/step-metadata";

export function StepNode({ data }: { data: Step }) {
  const { edit } = useContext(GraphContext)!;
  const dispatch = useContext(GraphDispatchContext)!;

  const isStepEditable = data.id !== 0;
  const showEditElements = edit && isStepEditable;

  const handleEditSocketId = (oldSocketId: string) => (newSocketId: string) => {
    dispatch({
      type: GraphActionType.UpdateSocketId,
      payload: { stepId: data.id, oldSocketId, newSocketId },
    });
  };

  const addSocket = useCallback(
    (socketType: SocketType) => () => {
      dispatch({
        type: GraphActionType.AddSocket,
        payload: { stepId: data.id, socketType },
      });
    },
    [data.id, dispatch],
  );

  const deleteSocket = (socketId: string) => () => {
    dispatch({
      type: GraphActionType.DeleteSocket,
      payload: { stepId: data.id, socketId },
    });
  };

  const deleteStep = useCallback(
    () =>
      dispatch({ type: GraphActionType.DeleteStep, payload: { id: data.id } }),
    [data.id, dispatch],
  );

  const handlesInStepMetadata = ["OUTPUT_STEP", "INPUT_STEP"].includes(
    data.type,
  );

  return (
    <div
      className={cn(
        "flex min-w-52 flex-col rounded bg-[#141414] pb-2 font-mono text-slate-300 outline outline-[0.08rem] outline-neutral-500",
      )}
    >
      {/* Node header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 rounded-t py-2 pl-1 pr-4 font-medium uppercase">
          <GoDotFill
            style={{ color: `${StepNodeColorMap[data.type]}` }}
            className="h-5 w-5"
          />
          {data.type}
        </div>
        {showEditElements && (
          <Button
            size={"sm"}
            className="mr-3 h-fit w-fit px-1 py-1"
            variant={"secondary"}
            onClick={deleteStep}
            type="button"
          >
            <Trash className="h-2 w-2" />
          </Button>
        )}
      </div>
      {/* Node metadata */}
      <StepMetadata step={data} />
      {/* Node body */}

      {!handlesInStepMetadata && (
        <div className="text-xs font-light">
          <div className="flex flex-row justify-between">
            <NodeSlotGroup>
              {data.inputs.map((stepSocket: StepSocket, _: number) => (
                <NodeSlot
                  // TODO: changing this to id is a regression, but is needed to show the correct socket id on dropdown change
                  // the proper fix comes with the pending refactor of socket id formats
                  key={stepSocket.id}
                  id={stepSocket.id}
                  label={stepSocket.id}
                  type="target"
                  edit={edit}
                  onEditSocketId={handleEditSocketId(stepSocket.id)}
                  onDeleteSocket={deleteSocket(stepSocket.id)}
                />
              ))}
              {showEditElements && (
                <Button
                  size={"sm"}
                  className="ml-3 h-fit w-fit px-1 py-1"
                  variant={"secondary"}
                  onClick={addSocket(SocketType.Input)}
                  type="button"
                >
                  <Plus className="h-2 w-2" />
                </Button>
              )}
            </NodeSlotGroup>
            <NodeSlotGroup>
              {data.outputs.map((stepSocket: StepSocket, index: number) => (
                <NodeSlot
                  key={index}
                  id={stepSocket.id}
                  label={stepSocket.id}
                  type="source"
                  edit={edit}
                  onEditSocketId={handleEditSocketId(stepSocket.id)}
                  onDeleteSocket={deleteSocket(stepSocket.id)}
                />
              ))}
              {showEditElements && (
                <Button
                  size={"sm"}
                  className="mr-3 h-fit w-fit self-end px-1 py-1"
                  variant={"secondary"}
                  onClick={addSocket(SocketType.Output)}
                  type="button"
                >
                  <Plus className="h-2 w-2" />
                </Button>
              )}
            </NodeSlotGroup>
          </div>
        </div>
      )}
    </div>
  );
}
