import "@xyflow/react/dist/style.css";

import { ReactFlowProvider } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { GraphEdge } from "@/api";
import { cn } from "@/lib/utils";

import {
  GraphAction,
  GraphActionType,
  GraphContext,
  GraphDispatchContext,
  graphReducer,
} from "./graph-context";
import GraphFileEditor from "./graph-file-editor";
import GraphView from "./graph-view";
import { Step } from "./types";

type OwnProps = {
  input?: Step;
  steps: Step[];
  edges: GraphEdge[];
  isEditing: boolean;
  onChange?: (action: GraphAction) => void;
};

const NodeGraph: React.FC<OwnProps> = ({
  input,
  steps: initialSteps,
  edges: initialEdges,
  isEditing,
  onChange,
}) => {
  const [graph, dispatch] = useImmerReducer(graphReducer, {
    steps: input ? [input, ...initialSteps] : initialSteps,
    edges: initialEdges,
    selectedSocketId: null,
    selectedStepId: null,
    isEditing,
  });

  useEffect(() => {
    if (!input) return;
    dispatch({
      type: GraphActionType.UpdateUserInputStep,
      payload: { step: input },
    });
  }, [input]);

  const wrappedDispatch = useCallback(
    (action: GraphAction) => {
      dispatch(action);
      if (onChange) {
        onChange(action);
      }
    },
    [dispatch, onChange],
  );

  return (
    <GraphContext.Provider value={graph}>
      <GraphDispatchContext.Provider value={wrappedDispatch}>
        <div
          className={cn("grid gap-1", {
            // show editor only if a socket is selected
            "grid-cols-2": graph.selectedSocketId !== null,
          })}
        >
          {graph.selectedSocketId !== null && (
            <div className="h-[60vh]">
              <GraphFileEditor />
            </div>
          )}
          <GraphView />
        </div>
      </GraphDispatchContext.Provider>
    </GraphContext.Provider>
  );
};

export default function TestcaseNodeGraph(props: OwnProps) {
  return (
    <ReactFlowProvider>
      <NodeGraph {...props} />
    </ReactFlowProvider>
  );
}
