import { useContext } from "react";

import { ObjectAccessStep } from "@/api";
import {
  GraphContext,
  GraphDispatchContext,
} from "@/features/problems/components/tasks/graph-context";

import NodeInput from "../node-input";

type OwnProps = {
  step: ObjectAccessStep;
};

const ObjectAccessMetadata: React.FC<OwnProps> = ({ step }) => {
  const { isEditing } = useContext(GraphContext)!;
  const dispatch = useContext(GraphDispatchContext)!;

  return (
    <div>
      key: "
      {isEditing ? (
        <NodeInput
          value={step.key}
          onChange={(newKey) =>
            dispatch({
              type: "UPDATE_STEP_EXCLUDING_SOCKETS",
              stepId: step.id,
              step: {
                ...step,
                key: newKey,
              },
            })
          }
        />
      ) : (
        <span>{step.key}</span>
      )}
      "
    </div>
  );
};

export default ObjectAccessMetadata;
