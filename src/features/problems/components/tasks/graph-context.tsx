import { createContext, Dispatch } from "react";
import { ImmerReducer } from "use-immer";

import {
  GraphEdge,
  InputStep,
  OutputSocket,
  StepSocket,
  StepType,
} from "@/api";
import { isFile } from "@/lib/types";

import { Step } from "./types";

export type GraphState = {
  steps: Step[];
  edges: GraphEdge[];
  selectedStepId: number | null;
  selectedSocketId: string | null;
  isEditing: boolean;
};

type UpdateInputStepAction = {
  type: "UPDATE_INPUT_STEP";
  step: InputStep;
};

type AddStepAction = {
  type: "ADD_STEP";
  stepType: StepType;
};

type DeleteStepAction = {
  type: "DELETE_STEP";
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
  socketFields?: Omit<Partial<OutputSocket>, "id">;
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
  socketId: string;
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
  | DeleteStepAction
  | SelectStepAction
  | DeselectStepAction
  | UpdateStepAction
  | AddStepSocketAction
  | DeleteStepSocketAction
  | UpdateStepSocketAction
  | AddEdgeAction
  | DeleteEdgeAction
  | UpdateInputStepAction;

const updateInputStep = (state: GraphState, action: UpdateInputStepAction) => {
  // TEMP: Assume that input step is always the first step (at idx = 0)
  // This is currently guaranteed by `NodeGraph`
  // TODO: refactor this, this is so so so so so bad
  state.steps[0] = action.step;
  return state;
};

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
    case "STRING_MATCH_STEP":
      newStep = {
        ...baseStep,
        inputs: [
          ...baseStep.inputs,
          { id: "DATA.IN.STRING.0", data: null },
          { id: "DATA.IN.STRING.1", data: null },
        ],
        outputs: [...baseStep.outputs, { id: "DATA.OUT.MATCH", data: null }],
      };
  }
  state.steps.push(newStep!);
  return state;
};

const deleteStep = (state: GraphState, action: DeleteStepAction) => {
  state.steps = state.steps.filter((node) => node.id !== action.stepId);
  state.edges.filter(
    (edge) =>
      edge.from_node_id !== action.stepId && edge.to_node_id !== action.stepId,
  );

  // if file editor is open for a socket in this step, deselect socket to close it
  if (state.selectedStepId === action.stepId) {
    state.selectedStepId = null;
    state.selectedSocketId = null;
  }
  return state;
};

const updateStep = (state: GraphState, action: UpdateStepAction) => {
  const stepIndex = state.steps.findIndex((node) => node.id === action.stepId);
  state.steps[stepIndex] = action.step;
  return state;
};

// Note: we only create data sockets with this method.
// All control sockets are created on initialisation and should not be changed
const addStepSocket = (state: GraphState, action: AddStepSocketAction) => {
  const step = state.steps.find((node) => node.id === action.stepId);
  if (!step) {
    console.error(`Add step socket: step ${action.stepId} not found`);
    return state;
  }
  const allIds = step.inputs
    .map((socket) => socket.id)
    .concat(step.outputs.map((socket) => socket.id));

  // generate a unique id
  const PREFIX = "DATA.";
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

  // if this socket is open as a file, deselect it
  if (
    state.selectedStepId === action.stepId &&
    state.selectedSocketId === action.socketId
  ) {
    state.selectedStepId = null;
    state.selectedSocketId = null;
  }
  return state;

  return state;
};

const updateStepSocket = (
  state: GraphState,
  action: UpdateStepSocketAction,
) => {
  const stepIndex = state.steps.findIndex((node) => node.id === action.stepId);
  const step = state.steps[stepIndex];

  // Update name of socket within the Step
  let socket: StepSocket | undefined;
  if (action.isInput) {
    socket = step.inputs.find((socket) => socket.id === action.oldSocketId);
  } else {
    socket = step.outputs.find((socket) => socket.id === action.oldSocketId);
  }

  if (socket === undefined) {
    console.error("Socket not found");
    return state;
  }

  socket.id = action.newSocketId;
  if (action.socketFields !== undefined) {
    Object.assign(socket, action.socketFields);
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

  // if this socket is open as a file and it is no longer a file, deselect it
  if (
    state.selectedStepId === action.stepId &&
    state.selectedSocketId === action.oldSocketId &&
    !isFile(action.socketFields?.data)
  ) {
    state.selectedStepId = null;
    state.selectedSocketId = null;
  }

  return state;
};

const selectSocket = (state: GraphState, action: SelectStepAction) => {
  const selectedStep =
    state.steps.find((node) => node.id === action.stepId) || null;

  if (!selectedStep) {
    console.error("Step not found");
    return state;
  }

  // this is used only for inputs so far, so this is okay
  const selectedSocket = selectedStep.outputs.find(
    (socket) => socket.id === action.socketId,
  );

  if (!selectedSocket) {
    console.error("Socket not found");
    return state;
  }

  state.selectedStepId = action.stepId;
  state.selectedSocketId = selectedSocket.id;

  return state;
};

const deselectSocket = (state: GraphState) => {
  state.selectedStepId = null;
  state.selectedSocketId = null;
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
    case "DELETE_STEP":
      return deleteStep(state, action);
    case "SELECT_STEP":
      return selectSocket(state, action);
    case "DESELECT_STEP":
      return deselectSocket(state);
    case "ADD_STEP_SOCKET":
      return addStepSocket(state, action);
    case "DELETE_STEP_SOCKET":
      return deleteStepSocket(state, action);
    case "UPDATE_STEP_SOCKET":
      return updateStepSocket(state, action);
    case "UPDATE_STEP_EXCLUDING_SOCKETS":
      return updateStep(state, action);
    case "ADD_EDGE":
      return addEdge(state, action);
    case "DELETE_EDGE":
      return deleteEdge(state, action);
    case "UPDATE_INPUT_STEP":
      return updateInputStep(state, action);
  }
};

export const GraphContext = createContext<GraphState | null>(null);
export const GraphDispatchContext = createContext<Dispatch<GraphAction> | null>(
  null,
);
