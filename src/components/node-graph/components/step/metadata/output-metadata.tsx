import { Delete, Plus, Trash } from "lucide-react";
import { useCallback, useContext } from "react";

import { OutputSocket, OutputStep } from "@/api";
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
import NodeInput from "../node-input";
import OutputTable from "../output-table/output-table";

type OwnProps = {
  step: OutputStep;
};

const OutputMetadata: React.FC<OwnProps> = ({ step }) => {
  const { isEditing } = useContext(GraphContext)!;
  const dispatch = useContext(GraphDispatchContext)!;

  const updateSocketMetadata = (
    metadataIndex: number,
    newMetadata: OutputSocket,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...newMetadataWithoutId } = newMetadata;
    dispatch({
      type: "UPDATE_STEP_SOCKET",
      stepId: step.id,
      oldSocketId: step.inputs[metadataIndex].id,
      newSocketId: newMetadata.id,
      isInput: true,
      socketFields: newMetadataWithoutId,
    });
  };

  const handleEditSocketId = (oldSocketId: string) => (newSocketId: string) => {
    dispatch({
      type: "UPDATE_STEP_SOCKET",
      stepId: step.id,
      oldSocketId,
      newSocketId,
      // output steps only have inputs
      isInput: true,
    });
  };

  const addInputSocket = useCallback(() => {
    dispatch({ type: "ADD_STEP_SOCKET", stepId: step.id, isInput: true });
  }, [dispatch, step]);

  const deleteSocket = useCallback(
    (socketId: string) => () => {
      dispatch({
        type: "DELETE_STEP_SOCKET",
        stepId: step.id,
        socketId,
        isInput: true,
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
              <TableRow key={socket.id}>
                <TableCell>
                  <NodeSlot
                    key={socket.id}
                    id={socket.id}
                    label=""
                    type="target"
                    hideLabel
                  />
                </TableCell>
                <TableCell>
                  <NodeInput
                    value={socket.id}
                    onChange={handleEditSocketId(socket.id)}
                  />
                </TableCell>
                <TableCell>
                  <NodeInput
                    value={socket.user_label || ""}
                    onChange={(newLabel) => {
                      updateSocketMetadata(index, {
                        ...socket,
                        user_label: newLabel,
                      });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {socket.comparison ? (
                      <>
                        <Select>
                          <SelectTrigger className="h-fit w-fit p-1">
                            <SelectValue
                              placeholder={socket.comparison?.operator}
                            />
                          </SelectTrigger>
                          <SelectContent
                            onSelect={(value) =>
                              updateSocketMetadata(index, {
                                ...socket,
                                comparison: {
                                  ...(socket.comparison ?? {
                                    operator: "=",
                                    value: "",
                                  }),
                                  value,
                                },
                              })
                            }
                          >
                            <SelectItem value="=">=</SelectItem>
                            <SelectItem value="<">&lt;</SelectItem>
                            <SelectItem value=">">&gt;</SelectItem>
                          </SelectContent>
                        </Select>{" "}
                        <NodeInput
                          value={JSON.stringify(socket.comparison?.value ?? "")}
                          onChange={(newValue) => {
                            updateSocketMetadata(index, {
                              ...socket,
                              comparison: {
                                ...(socket.comparison ?? {
                                  operator: "=",
                                  value: "",
                                }),
                                value: JSON.parse(newValue),
                              },
                            });
                          }}
                        />
                        <Button
                          size={"sm"}
                          className="h-fit w-fit px-1 py-1"
                          variant={"secondary"}
                          onClick={() =>
                            updateSocketMetadata(index, {
                              ...socket,
                              comparison: null,
                            })
                          }
                          type="button"
                        >
                          <Delete className="h-2 w-2" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        size={"sm"}
                        className="h-fit w-fit px-1 py-1"
                        variant={"secondary"}
                        onClick={() =>
                          updateSocketMetadata(index, {
                            ...socket,
                            comparison: {
                              operator: "=",
                              value: "",
                            },
                          })
                        }
                        type="button"
                      >
                        <Plus className="h-2 w-2" />
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  <Checkbox
                    className="inline h-4 w-4 rounded-sm border border-gray-500/50"
                    checked={socket.public || false}
                    onCheckedChange={() => {
                      updateSocketMetadata(index, {
                        ...socket,
                        public: !socket.public,
                      });
                    }}
                  ></Checkbox>
                </TableCell>
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
              </TableRow>
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
