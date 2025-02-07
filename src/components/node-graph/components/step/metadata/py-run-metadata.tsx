import { useQuery } from "@tanstack/react-query";
import { useNodeConnections, useNodesData } from "@xyflow/react";
import { useContext, useState } from "react";

import { InputStep, PyRunFunctionStep } from "@/api";
import { Checkbox } from "@/components/ui/checkbox";
import {
  GraphActionType,
  GraphContext,
  GraphDispatchContext,
} from "@/features/problems/components/tasks/graph-context";
import { getFunctions } from "@/features/problems/queries";
import { isFile } from "@/lib/types";

import NodeInput from "../node-input";

type OwnProps = {
  step: PyRunFunctionStep;
};

const FILE_HANDLE_ID = "DATA.IN.FILE";

const PyRunMetadata: React.FC<OwnProps> = ({ step }) => {
  const { edit } = useContext(GraphContext)!;
  const dispatch = useContext(GraphDispatchContext)!;

  const [functionIdentifier, setFunctionIdentifier] = useState(
    step.function_identifier,
  );

  const [allowError, setAllowError] = useState(step.allow_error || false);

  const connections = useNodeConnections({
    handleType: "target",
    handleId: FILE_HANDLE_ID,
    id: step.id.toString(),
  });
  const connection = connections[0];
  const inputNode = useNodesData(connection?.source);
  const fileSocket = (inputNode?.data as InputStep | undefined)?.outputs.find(
    (output) => output.id === connection.sourceHandle,
  );
  const fileContent =
    fileSocket && isFile(fileSocket.data) ? fileSocket.data.content : undefined;

  const { data: functionSignatures, error } = useQuery(
    getFunctions(fileContent ?? ""),
  );

  // TODO: remove once something is done with this
  console.log({ functionSignatures, error });

  const onChange = (newFunctionIdentifier: string, allow_error: boolean) => {
    dispatch({
      type: GraphActionType.UpdateStepMetadata,
      payload: {
        stepId: step.id,
        stepMetadata: {
          function_identifier: newFunctionIdentifier,
          allow_error,
        },
      },
    });
  };

  return edit ? (
    <>
      <div>
        function_identifier: "
        <NodeInput
          value={functionIdentifier}
          onChange={(newFunctionIdentifier) => {
            setFunctionIdentifier(newFunctionIdentifier);
            onChange(newFunctionIdentifier, allowError);
          }}
        />
        "
      </div>
      <div className="flex items-center gap-2">
        allow_error:
        <Checkbox
          className="inline bg-transparent text-xs"
          checked={allowError}
          onCheckedChange={() => setAllowError(!allowError)}
        />
      </div>
    </>
  ) : (
    <div className="flex flex-col items-center gap-1">
      <div>{(step as PyRunFunctionStep).function_identifier}(...)</div>
      <div>
        allow_error: {JSON.stringify((step as PyRunFunctionStep).allow_error)}
      </div>
    </div>
  );
};

export default PyRunMetadata;
