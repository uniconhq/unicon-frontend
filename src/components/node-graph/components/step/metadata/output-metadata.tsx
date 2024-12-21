import { Delete, Plus, Trash } from "lucide-react";
import { useCallback, useContext } from "react";

import { OutputSocketConfig, OutputStep } from "@/api";
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

  const updateStep = useCallback(
    (newStep: OutputStep) => {
      dispatch({
        type: "UPDATE_STEP_EXCLUDING_SOCKETS",
        stepId: step.id,
        step: newStep,
      });
    },
    [dispatch, step.id],
  );

  const updateSocketMetadata = (
    metadataIndex: number,
    newMetadata: OutputSocketConfig,
  ) => {
    const newMetadataList = [...step.socket_metadata];
    newMetadataList[metadataIndex] = newMetadata;
    updateStep({ ...step, socket_metadata: newMetadataList });
  };

  const handleEditSocketId = (oldSocketId: string) => (newSocketId: string) => {
    const socketMetadataIndex = step.socket_metadata.findIndex(
      (socket) => socket.id === oldSocketId,
    );
    updateSocketMetadata(socketMetadataIndex, {
      ...step.socket_metadata[socketMetadataIndex],
      id: newSocketId,
    });
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

    // generate unique id
    let newSocketId = "DATA.IN.TEMP";
    let i = 1;

    while (
      step.socket_metadata.map((socket) => socket.id).includes(newSocketId)
    ) {
      newSocketId = `DATA.IN.TEMP${i}`;
      i++;
    }
    updateStep({
      ...step,
      socket_metadata: [
        ...step.socket_metadata,
        {
          id: newSocketId,
          label: "new output value",
          public: false,
          comparison: null,
        },
      ],
    });
  }, [dispatch, step, updateStep]);

  const deleteSocket = useCallback(
    (socketId: string) => () => {
      dispatch({
        type: "DELETE_STEP_SOCKET",
        stepId: step.id,
        socketId,
        isInput: true,
      });
      updateStep({
        ...step,
        socket_metadata: step.socket_metadata.filter(
          (socket) => socket.id !== socketId,
        ),
      });
    },
    [dispatch, step, updateStep],
  );

  if (!isEditing) {
    return <OutputTable data={step.socket_metadata} />;
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
            {step.socket_metadata.map((socket, index) => (
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
                    value={socket.label || ""}
                    onChange={(newLabel) => {
                      updateSocketMetadata(index, {
                        ...socket,
                        label: newLabel,
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
                                value: newValue,
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
