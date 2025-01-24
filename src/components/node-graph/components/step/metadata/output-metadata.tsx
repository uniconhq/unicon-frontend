import { Plus } from "lucide-react";
import { useCallback, useContext } from "react";

import { OutputSocket, OutputStep } from "@/api";
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

import OutputTable from "../output-table/output-table";
import OutputMetadataRow from "./output-metadata-row";

type OwnProps = {
  step: OutputStep;
};

const OutputMetadata: React.FC<OwnProps> = ({ step }) => {
  const { isEditing } = useContext(GraphContext)!;
  const dispatch = useContext(GraphDispatchContext)!;

  // Does not handle updating socket ids. See handleEditSocketId for that
  const updateSocketMetadata =
    (metadataIndex: number) => (newMetadata: Partial<OutputSocket>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...newMetadataWithoutId } = newMetadata;
      dispatch({
        type: GraphActionType.UpdateSocketMetadata,
        payload: {
          stepId: step.id,
          socketId: step.inputs[metadataIndex].id,
          socketMetadata: newMetadataWithoutId,
        },
      });
    };

  const handleEditSocketId = (oldSocketId: string) => (newSocketId: string) => {
    dispatch({
      type: GraphActionType.UpdateSocketId,
      payload: { stepId: step.id, oldSocketId, newSocketId },
    });
  };

  const addInputSocket = useCallback(() => {
    dispatch({
      type: GraphActionType.AddSocket,
      payload: { stepId: step.id, socketType: SocketType.Input },
    });
  }, [dispatch, step]);

  const deleteSocket = useCallback(
    (socketId: string) => () => {
      dispatch({
        type: GraphActionType.DeleteSocket,
        payload: { stepId: step.id, socketId },
      });
    },
    [dispatch, step],
  );

  if (!isEditing) {
    return <OutputTable data={step.inputs} />;
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Socket ID</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Expected</TableHead>
              <TableHead>Public</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {step.inputs.map((socket, index) => (
              <OutputMetadataRow
                key={socket.id}
                socket={socket}
                onUpdateSocketMetadata={updateSocketMetadata(index)}
                onEditSocketId={handleEditSocketId}
                onDeleteSocket={deleteSocket(socket.id)}
                isEditable={!isControlSocket(socket)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <Button
        size={"sm"}
        className="mt-3 h-fit w-fit px-1 py-1"
        variant={"secondary"}
        onClick={addInputSocket}
        type="button"
      >
        <Plus className="h-2 w-2" />
      </Button>
    </div>
  );
};

export default OutputMetadata;
