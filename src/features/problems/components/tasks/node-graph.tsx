import "@xyflow/react/dist/style.css";

import { ReactFlowProvider } from "@xyflow/react";
import { useCallback } from "react";
import { useImmerReducer } from "use-immer";

import { GraphEdge } from "@/api";
import { cn } from "@/lib/utils";

import {
  GraphAction,
  GraphContext,
  GraphDispatchContext,
  graphReducer,
} from "./graph-context";
import GraphFileEditor from "./graph-file-editor";
import GraphView from "./graph-view";
import { Step } from "./types";

type OwnProps = {
  steps: Step[];
  edges: GraphEdge[];
  isEditing: boolean;
  onChange?: (action: GraphAction) => void;
};

const NodeGraph: React.FC<OwnProps> = ({
  steps: initialSteps,
  edges: initialEdges,
  isEditing,
  onChange,
}) => {
  const [graph, dispatch] = useImmerReducer(graphReducer, {
    steps: initialSteps,
    edges: initialEdges,
    selectedSocket: null,
    selectedStepId: null,
    isEditing,
  });

  const wrappedDispatch = useCallback(
    (action: GraphAction) => {
      console.log("dispatching", action);
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
            "grid-cols-2": graph.selectedSocket !== null,
          })}
        >
          <GraphFileEditor />
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
