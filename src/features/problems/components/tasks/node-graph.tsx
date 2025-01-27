import "@xyflow/react/dist/style.css";

import { ReactFlowProvider } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { GraphEdge } from "@/api";

import {
  GraphAction,
  GraphActionType,
  GraphContext,
  GraphDispatchContext,
  graphReducer,
} from "./graph-context";
import GraphEditor from "./graph-editor";
import { Step } from "./types";

type NodeGraphProps = {
  id: string;
  input?: Step;
  steps: Step[];
  edges: GraphEdge[];
  isEditing: boolean;
  onChange?: (action: GraphAction) => void;
};

const NodeGraph: React.FC<NodeGraphProps> = ({
  id,
  input,
  steps: initialSteps,
  edges: initialEdges,
  isEditing,
  onChange,
}) => {
  const [graph, dispatch] = useImmerReducer(graphReducer, {
    id,
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
    <ReactFlowProvider>
      <GraphContext.Provider value={graph}>
        <GraphDispatchContext.Provider value={wrappedDispatch}>
          <GraphEditor graphId={id} className="h-[60vh]" />
        </GraphDispatchContext.Provider>
      </GraphContext.Provider>
    </ReactFlowProvider>
  );
};

export default NodeGraph;
