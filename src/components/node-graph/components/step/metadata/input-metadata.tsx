import { Plus } from "lucide-react";
import { useCallback, useContext } from "react";

import { InputStep, StepSocket } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GraphContext,
  GraphDispatchContext,
} from "@/features/problems/components/tasks/graph-context";
import { isControlSocket } from "@/utils/socket";

import InputTable from "../input-table/input-table";
import InputMetadataRow from "./input-metadata-row";

type OwnProps = {
  step: InputStep;
};

const InputMetadata: React.FC<OwnProps> = ({ step }) => {
  const { isEditing } = useContext(GraphContext)!;
  const dispatch = useContext(GraphDispatchContext)!;

  const isStepEditable = step.id !== 0;
  const showEditElements = isEditing && isStepEditable;

  const deleteSocket = useCallback(
    (socketId: string) => () => {
      dispatch({
        type: "DELETE_STEP_SOCKET",
        stepId: step.id,
        socketId,
        isInput: false,
      });
    },
    [dispatch, step.id],
  );

  const handleEditSocketId = (oldSocketId: string) => (newSocketId: string) => {
    dispatch({
      type: "UPDATE_STEP_SOCKET",
      stepId: step.id,
      oldSocketId,
      newSocketId,
      // input steps only have outputs
      isInput: false,
    });
  };

  const handleSocketChangeToFile = (socket: StepSocket) => () => {
    dispatch({
      type: "UPDATE_STEP_SOCKET",
      stepId: step.id,
      oldSocketId: socket.id,
      newSocketId: socket.id,
      socketFields: {
        data: {
          name: "file.py",
          content: "print('Hello World')",
        },
      },
      isInput: false,
    });
  };

  const addOutputSocket = useCallback(() => {
    dispatch({ type: "ADD_STEP_SOCKET", stepId: step.id, isInput: false });
  }, [dispatch, step.id]);

  if (!showEditElements) {
    return <InputTable data={step.outputs} step={step} />;
  }

  const onChangeValue = (socket: StepSocket) => (newValue: string) => {
    dispatch({
      type: "UPDATE_STEP_SOCKET",
      stepId: step.id,
      oldSocketId: socket.id,
      newSocketId: socket.id,
      socketFields: { data: JSON.parse(newValue) },
      isInput: false,
    });
  };

  const onChangeToValue = (socket: StepSocket) => () => {
    dispatch({
      type: "UPDATE_STEP_SOCKET",
      stepId: step.id,
      oldSocketId: socket.id,
      newSocketId: socket.id,
      socketFields: { data: "" },
      isInput: false,
    });
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Socket ID</TableHead>
              <TableHead>Value</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {step.outputs.map((socket) => (
              <InputMetadataRow
                key={socket.id}
                socket={socket}
                onDelete={deleteSocket(socket.id)}
                onEditSocketId={handleEditSocketId(socket.id)}
                onChangeToFile={handleSocketChangeToFile(socket)}
                onChangeToValue={onChangeToValue(socket)}
                onChangeValue={onChangeValue(socket)}
                step={step}
                isEditable={showEditElements && !isControlSocket(socket)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <Button
        size={"sm"}
        className="mt-3 h-fit w-fit px-1 py-1"
        variant={"secondary"}
        onClick={addOutputSocket}
        type="button"
      >
        <Plus className="h-2 w-2" />
      </Button>
    </div>
  );
};

export default InputMetadata;
