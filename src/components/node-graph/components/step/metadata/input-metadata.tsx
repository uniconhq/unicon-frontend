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
  GraphActionType,
  GraphContext,
  GraphDispatchContext,
  SocketType,
} from "@/features/problems/components/tasks/graph-context";
import { isControlSocket } from "@/utils/socket";

import InputTable from "../input-table/input-table";
import InputMetadataRow from "./input-metadata-row";

type OwnProps = {
  step: InputStep;
};

const InputMetadata: React.FC<OwnProps> = ({ step }) => {
  const { edit } = useContext(GraphContext)!;
  const dispatch = useContext(GraphDispatchContext)!;

  const isStepEditable = step.id !== 0;
  const showEditElements = edit && isStepEditable;

  const deleteSocket = useCallback(
    (socketId: string) => () => {
      dispatch({
        type: GraphActionType.DeleteSocket,
        payload: { stepId: step.id, socketId },
      });
    },
    [dispatch, step.id],
  );

  const handleEditSocketId = (oldSocketId: string) => (newSocketId: string) => {
    dispatch({
      type: GraphActionType.UpdateSocketId,
      payload: { stepId: step.id, oldSocketId, newSocketId },
    });
  };

  const handleSocketChangeToFile = (socket: StepSocket) => () => {
    dispatch({
      type: GraphActionType.UpdateSocketMetadata,
      payload: {
        stepId: step.id,
        socketId: socket.id,
        socketMetadata: {
          data: {
            name: "file.py",
            content: "print('Hello World')",
          },
        },
      },
    });
  };

  const addOutputSocket = useCallback(() => {
    dispatch({
      type: GraphActionType.AddSocket,
      payload: { stepId: step.id, socketType: SocketType.Output },
    });
  }, [dispatch, step.id]);

  if (!showEditElements) {
    return <InputTable data={step.outputs} step={step} />;
  }

  const onChangeValue = (socket: StepSocket) => (newValue: string) => {
    dispatch({
      type: GraphActionType.UpdateSocketMetadata,
      payload: {
        stepId: step.id,
        socketId: socket.id,
        socketMetadata: { data: JSON.parse(newValue) },
      },
    });
  };

  const onChangeToValue = (socket: StepSocket) => () => {
    dispatch({
      type: GraphActionType.UpdateSocketMetadata,
      payload: {
        stepId: step.id,
        socketId: socket.id,
        socketMetadata: { data: "" },
      },
    });
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table hideOverflow>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Socket ID</TableHead>
              <TableHead>Value</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {step.outputs.map((socket, index) => (
              <InputMetadataRow
                key={index}
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
