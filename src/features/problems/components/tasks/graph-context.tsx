import { createContext, Dispatch } from "react";
import { ImmerReducer } from "use-immer";

import { GraphEdge, StepType } from "@/api";

import { Step } from "./types";

type GraphState = {
  steps: Step[];
  edges: GraphEdge[];
  selectedStep: Step | null;
  isEditing: boolean;
};

type AddStepAction = {
  type: "ADD_STEP";
  stepType: StepType;
};

type RemoveStepAction = {
  type: "REMOVE_STEP";
  stepId: number;
};

// Sockets are not included in this action as special care is needed
// like updating the edges of affected sockets
type UpdateStepAction = {
  type: "UPDATE_STEP_EXCLUDING_SOCKETS";
  stepId: number;
  step: Step;
};

type UpdateStepSocketIdAction = {
  type: "UPDATE_STEP_SOCKET_ID";
  stepId: number;
  oldSocketId: string;
  newSocketId: string;
  isInput: boolean;
};

type SelectStepAction = {
  type: "SELECT_STEP";
  stepId: number;
};

type DeselectStepAction = {
  type: "DESELECT_STEP";
};

type AddEdgeAction = {
  type: "ADD_EDGE";
  edge: GraphEdge;
};

type DeleteEdgeAction = {
  type: "DELETE_EDGE";
  edgeId: number;
};

export type GraphAction =
  | AddStepAction
  | RemoveStepAction
  | UpdateStepAction
  | SelectStepAction
  | DeselectStepAction
  | AddEdgeAction
  | DeleteEdgeAction
  | UpdateStepSocketIdAction;

const addStep = (state: GraphState, action: AddStepAction) => {
  const newStep: Step = {
    id: Math.max(...state.steps.map((node) => node.id), -1) + 1,
    type: action.stepType,
    inputs: [
      {
        id: "CONTROL.IN",
        data: null,
      },
    ],
    outputs: [
      {
        id: "CONTROL.OUT",
        data: null,
      },
    ],
    ...(action.stepType === "PY_RUN_FUNCTION_STEP"
      ? { function_identifier: "", allow_error: false }
      : {}),
    ...(action.stepType === "OBJECT_ACCESS_STEP" ? { key: "" } : {}),
    ...(action.stepType === "OUTPUT_STEP" ? { socket_metadata: {} } : {}),
  };
  state.steps.push(newStep);
  return state;
};

const removeStep = (state: GraphState, action: RemoveStepAction) => {
  state.steps = state.steps.filter((node) => node.id !== action.stepId);
  state.edges.filter(
    (edge) =>
      edge.from_node_id !== action.stepId && edge.to_node_id !== action.stepId,
  );
  return state;
};

const updateStep = (state: GraphState, action: UpdateStepAction) => {
  const stepIndex = state.steps.findIndex((node) => node.id === action.stepId);
  state.steps[stepIndex] = action.step;
  return state;
};

const updateStepSocketId = (
  state: GraphState,
  action: UpdateStepSocketIdAction,
) => {
  const stepIndex = state.steps.findIndex((node) => node.id === action.stepId);
  const step = state.steps[stepIndex];

  // Update name of socket within the Step
  if (action.isInput) {
    const socketIndex = step.inputs.findIndex(
      (socket) => socket.id === action.oldSocketId,
    );
    step.inputs[socketIndex].id = action.newSocketId;
  } else {
    const socketIndex = step.outputs.findIndex(
      (socket) => socket.id === action.oldSocketId,
    );
    step.outputs[socketIndex].id = action.newSocketId;
  }

  // Update name of socket for all edges it uses
  state.edges.forEach((edge) => {
    if (
      edge.from_node_id === action.stepId &&
      edge.from_socket_id === action.oldSocketId
    ) {
      edge.from_socket_id = action.newSocketId;
    }
    if (
      edge.to_node_id === action.stepId &&
      edge.to_socket_id === action.oldSocketId
    ) {
      edge.to_socket_id = action.newSocketId;
    }
  });

  return state;
};

const selectStep = (state: GraphState, action: SelectStepAction) => {
  state.selectedStep =
    state.steps.find((node) => node.id === action.stepId) || null;
  return state;
};

const deselectStep = (state: GraphState) => {
  state.selectedStep = null;
  return state;
};

const addEdge = (state: GraphState, action: AddEdgeAction) => {
  state.edges.push(action.edge);
  return state;
};

const deleteEdge = (state: GraphState, action: DeleteEdgeAction) => {
  state.edges = state.edges.filter((edge) => edge.id !== action.edgeId);
  return state;
};

export const graphReducer: ImmerReducer<GraphState, GraphAction> = (
  state: GraphState,
  action: GraphAction,
): GraphState => {
  switch (action.type) {
    case "ADD_STEP":
      return addStep(state, action);
    case "REMOVE_STEP":
      return removeStep(state, action);
    case "UPDATE_STEP_EXCLUDING_SOCKETS":
      return updateStep(state, action);
    case "SELECT_STEP":
      return selectStep(state, action);
    case "DESELECT_STEP":
      return deselectStep(state);
    case "UPDATE_STEP_SOCKET_ID":
      return updateStepSocketId(state, action);
    case "ADD_EDGE":
      return addEdge(state, action);
    case "DELETE_EDGE":
      return deleteEdge(state, action);
  }
};

export const GraphContext = createContext<GraphState | null>(null);
export const GraphDispatchContext = createContext<Dispatch<GraphAction> | null>(
  null,
);
