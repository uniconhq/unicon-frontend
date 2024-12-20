import "@xyflow/react/dist/style.css";

import { ReactFlowProvider } from "@xyflow/react";
import { useCallback } from "react";
import { useImmerReducer } from "use-immer";

import { GraphEdge } from "@/api";

import {
  GraphAction,
  GraphContext,
  GraphDispatchContext,
  graphReducer,
} from "./graph-context";
import GraphView from "./graph-view";
import { Step } from "./types";

type OwnProps = {
  steps: Step[];
  edges: GraphEdge[];
};

const NodeGraph: React.FC<OwnProps> = ({
  steps: initialSteps,
  edges: initialEdges,
}) => {
  const [graph, dispatch] = useImmerReducer(graphReducer, {
    steps: initialSteps,
    edges: initialEdges,
    selectedStep: null,
    // TODO: make this a parameter
    isEditing: true,
  });

  const wrappedDispatch = useCallback(
    (action: GraphAction) => {
      console.log("dispatching", action);

      dispatch(action);
    },
    [dispatch],
  );

  return (
    <GraphContext.Provider value={graph}>
      <GraphDispatchContext.Provider value={wrappedDispatch}>
        <div className="grid gap-1">
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
