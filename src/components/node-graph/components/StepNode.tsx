import { GoDotFill } from "react-icons/go";

import { Step, StepSocket } from "@/api";
import { StepNodeColorMap } from "@/lib/colors";

import { NodeSlot, NodeSlotGroup } from "./NodeSlot";

export function StepNode({ data }: { data: Step }) {
  return (
    <div className="flex min-w-48 flex-col rounded bg-[#141414] pb-2 font-mono text-slate-300 outline outline-[0.08rem] outline-neutral-500">
      {/* Node header */}
      <div className="mb-2 flex items-center rounded-t px-2 py-1 text-sm font-medium uppercase">
        <GoDotFill
          style={{ color: `${StepNodeColorMap[data.type]}` }}
          className="mr-1"
        />
        {data.type}
      </div>
      {/* Node body */}
      <div className="text-xs font-light">
        <div className="flex flex-row justify-between">
          <NodeSlotGroup>
            {data.inputs.map((stepSocket: StepSocket) => (
              <NodeSlot
                key={stepSocket.id}
                id={stepSocket.id}
                label={stepSocket.id}
                type="source"
              />
            ))}
          </NodeSlotGroup>
          <NodeSlotGroup>
            {data.outputs.map((stepSocket: StepSocket) => (
              <NodeSlot
                key={stepSocket.id}
                id={stepSocket.id}
                label={stepSocket.id}
                type="target"
              />
            ))}
          </NodeSlotGroup>
        </div>
      </div>
    </div>
  );
}
