import { Trash } from "lucide-react";
import { useCallback, useContext } from "react";

import { InputStep } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GraphContext,
  GraphDispatchContext,
} from "@/features/problems/components/tasks/graph-context";

import { NodeSlot } from "../../node-slot";
import InputTable from "../input-table/input-table";
import NodeInput from "../node-input";

type OwnProps = {
  step: InputStep;
};

const InputMetadata: React.FC<OwnProps> = ({ step }) => {
  const { isEditing } = useContext(GraphContext)!;
  const dispatch = useContext(GraphDispatchContext)!;

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

  if (!isEditing) {
    return <InputTable data={step.outputs} />;
  }

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
              <TableRow key={socket.id}>
                <TableCell>
                  <Button
                    size={"sm"}
                    className="h-fit w-fit px-1 py-1"
                    variant={"secondary"}
                    onClick={deleteSocket(socket.id)}
                    type="button"
                  >
                    <Trash className="h-2 w-2" />
                  </Button>
                </TableCell>
                <TableCell>
                  <NodeInput
                    value={socket.id}
                    onChange={handleEditSocketId(socket.id)}
                  />
                </TableCell>
                <TableCell>
                  {
                    <NodeInput
                      value={JSON.stringify(socket.data)}
                      onChange={(newValue) => {
                        dispatch({
                          type: "UPDATE_STEP_SOCKET",
                          stepId: step.id,
                          oldSocketId: socket.id,
                          newSocketId: socket.id,
                          data: JSON.parse(newValue),
                          isInput: false,
                        });
                      }}
                    />
                  }
                </TableCell>
                <TableCell>
                  <NodeSlot
                    key={socket.id}
                    id={socket.id}
                    label=""
                    type="source"
                    hideLabel
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InputMetadata;
