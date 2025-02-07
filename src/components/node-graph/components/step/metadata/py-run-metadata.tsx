import { useQuery } from "@tanstack/react-query";
import { useNodeConnections, useNodesData } from "@xyflow/react";
import { RefreshCcw, TriangleAlert } from "lucide-react";
import { useContext, useState } from "react";

import { InputStep, PyRunFunctionStep } from "@/api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  GraphActionType,
  GraphContext,
  GraphDispatchContext,
} from "@/features/problems/components/tasks/graph-context";
import { getFunctions } from "@/features/problems/queries";
import { isFile } from "@/lib/types";

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

  const [allowError, setAllowError] = useState(step.allow_error ?? false);

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

  const { data: functionSignatures } = useQuery(
    getFunctions(fileContent ?? ""),
  );

  const onChange = (newFunctionIdentifier: string) => {
    const newFunctionSignature = functionSignatures?.find(
      (signature) => signature.name === newFunctionIdentifier,
    );
    if (!newFunctionSignature) return;
    dispatch({
      type: GraphActionType.UpdatePyRunFunctionStep,
      payload: {
        stepId: step.id,
        functionIdentifier: newFunctionIdentifier,
        functionSignature: newFunctionSignature,
        allowError: !!step.allow_error,
      },
    });
  };

  const onAllowErrorChange = () => {
    setAllowError((allowError) => {
      dispatch({
        type: GraphActionType.UpdatePyRunFunctionStep,
        payload: {
          stepId: step.id,
          functionIdentifier,
          allowError: !allowError,
        },
      });
      return !allowError;
    });
  };

  const isFunctionMissing =
    functionIdentifier &&
    !functionSignatures?.filter(
      (signature) => signature.name === functionIdentifier,
    ).length;

  return edit ? (
    <>
      <div className="flex items-center gap-2">
        function_identifier:
        <Select
          value={functionIdentifier}
          onValueChange={(newFunctionIdentifier) => {
            setFunctionIdentifier(newFunctionIdentifier);
            onChange(newFunctionIdentifier);
          }}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select a function" />
          </SelectTrigger>
          <SelectContent>
            {functionSignatures?.map((signature) => (
              <SelectItem key={signature.name} value={signature.name}>
                {signature.name}
              </SelectItem>
            ))}
            {isFunctionMissing && (
              <SelectItem value={functionIdentifier}>
                {functionIdentifier}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        {isFunctionMissing && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <TriangleAlert className="h-4 w-4 text-yellow-500" />
              </TooltipTrigger>
              <TooltipContent className="flex items-center gap-2">
                <TriangleAlert className="h-4 w-4 text-yellow-600" /> Function
                not found. Please check the file.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <Button
          size="sm"
          variant="secondary"
          type="button"
          onClick={() => {
            onChange(functionIdentifier);
          }}
        >
          <RefreshCcw />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        allow_error:
        <Checkbox
          className="inline bg-transparent text-xs"
          checked={allowError}
          onCheckedChange={onAllowErrorChange}
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
