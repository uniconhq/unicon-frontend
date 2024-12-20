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

type AddStepSocketAction = {
  type: "ADD_STEP_SOCKET";
  stepId: number;
  isInput: boolean;
};

type UpdateStepSocketAction = {
  type: "UPDATE_STEP_SOCKET";
  stepId: number;
  oldSocketId: string;
  newSocketId: string;
  isInput: boolean;
};

type DeleteStepSocketAction = {
  type: "DELETE_STEP_SOCKET";
  stepId: number;
  socketId: string;
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
  | UpdateStepSocketAction
  | DeleteStepSocketAction
  | AddStepSocketAction;

const addStep = (state: GraphState, action: AddStepAction) => {
  const baseStep: Step = {
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
  };

  let newStep: Step;

  //   ...(action.stepType === "PY_RUN_FUNCTION_STEP"
  // ? { function_identifier: "", allow_error: false }
  // : {}),
  // ...(action.stepType === "OBJECT_ACCESS_STEP" ? { key: "" } : {}),
  // ...(action.stepType === "OUTPUT_STEP" ? { socket_metadata: {} } : {}),

  switch (action.stepType) {
    case "PY_RUN_FUNCTION_STEP":
      newStep = {
        ...baseStep,
        inputs: [...baseStep.inputs, { id: "DATA.IN.FILE", data: null }],
        function_identifier: "",
        allow_error: false,
      };
      break;
    case "OBJECT_ACCESS_STEP":
      newStep = {
        ...baseStep,
        inputs: [...baseStep.inputs, { id: "DATA.IN.OBJECT", data: null }],
        outputs: [...baseStep.outputs, { id: "DATA.OUT.VALUE", data: null }],
        key: "",
      };
      break;
    case "OUTPUT_STEP":
      newStep = {
        ...baseStep,
        socket_metadata: [],
      };
      break;
    case "INPUT_STEP":
      newStep = baseStep;
      break;
    case "LOOP_STEP":
      newStep = {
        ...baseStep,
        inputs: [
          ...baseStep.inputs,
          { id: "CONTROL.IN.PREDICATE", data: null },
        ],
        outputs: [...baseStep.outputs, { id: "CONTROL.OUT.BODY", data: null }],
      };
      break;
    case "IF_ELSE_STEP":
      newStep = {
        ...baseStep,
        inputs: [
          ...baseStep.inputs,
          { id: "CONTROL.IN.PREDICATE", data: null },
        ],
        outputs: [
          ...baseStep.outputs,
          { id: "CONTROL.OUT.IF", data: null },
          { id: "CONTROL.OUT.ELSE", data: null },
        ],
      };
      break;
  }
  state.steps.push(newStep!);
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

const addStepSocket = (state: GraphState, action: AddStepSocketAction) => {
  const step = state.steps.find((node) => node.id === action.stepId);
  if (!step) {
    console.error("Step not found");
    return state;
  }
  const allIds = step.inputs
    .map((socket) => socket.id)
    .concat(step.outputs.map((socket) => socket.id));

  // generate a unique id
  const PREFIX = action.isInput ? "DATA.IN." : "DATA.OUT.";
  let newSocketId = PREFIX + "TEMP";
  let i = 1;

  while (allIds.includes(newSocketId)) {
    newSocketId = `${PREFIX}TEMP${i}`;
    i++;
  }

  if (action.isInput) {
    step.inputs.push({
      id: newSocketId,
      data: null,
    });
  } else {
    step.outputs.push({
      id: newSocketId,
      data: null,
    });
  }
  return state;
};

const deleteStepSocket = (
  state: GraphState,
  action: DeleteStepSocketAction,
) => {
  const step = state.steps.find((node) => node.id === action.stepId);
  if (!step) {
    console.error("Step not found");
    return state;
  }

  if (action.isInput) {
    step.inputs = step.inputs.filter((socket) => socket.id !== action.socketId);
  } else {
    step.outputs = step.outputs.filter(
      (socket) => socket.id !== action.socketId,
    );
  }

  // Remove all edges that use the socket
  state.edges = state.edges.filter(
    (edge) =>
      !(
        (edge.from_node_id === action.stepId &&
          edge.from_socket_id === action.socketId) ||
        (edge.to_node_id === action.stepId &&
          edge.to_socket_id === action.socketId)
      ),
  );

  return state;
};

const updateStepSocket = (
  state: GraphState,
  action: UpdateStepSocketAction,
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
    case "UPDATE_STEP_SOCKET":
      return updateStepSocket(state, action);
    case "ADD_STEP_SOCKET":
      return addStepSocket(state, action);
    case "DELETE_STEP_SOCKET":
      return deleteStepSocket(state, action);
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
