import { useContext } from "react";

import { File, InputStep, StepSocket } from "@/api";
import { Button } from "@/components/ui/button";
import { GraphDispatchContext } from "@/features/problems/components/tasks/graph-context";

type OwnProps = {
  step: InputStep;
  socket: StepSocket;
};

const ViewFileButton: React.FC<OwnProps> = ({ step, socket }) => {
  const dispatch = useContext(GraphDispatchContext)!;
  return (
    <Button
      type="button"
      size={"sm"}
      className="h-fit w-fit px-1 py-1"
      variant={"secondary"}
      onClick={() => {
        dispatch({
          type: "SELECT_STEP",
          stepId: step.id,
          socketId: socket.id,
        });
      }}
    >
      View file ({(socket.data as File).name})
    </Button>
  );
};

export default ViewFileButton;
