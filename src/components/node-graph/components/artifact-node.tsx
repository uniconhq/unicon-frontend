import { ArtifactNodeData } from "@/lib/types";

import { NodeSlot } from "./node-slot";

export function ArtifactNode({ fileType }: Pick<ArtifactNodeData, "fileType">) {
  return (
    <>
      <div className="px-2">.{fileType}</div>
      <NodeSlot id="Artifact.Out" label="" type="target" />
    </>
  );
}
