import { createContext, Dispatch } from "react";
import { ImmerReducer } from "use-immer";

import { GraphEdge, InputStep, StepType } from "@/api";
import { isFile } from "@/lib/types";

import { Step } from "./types";

export type GraphState = {
  steps: Step[];
  edges: GraphEdge[];
  selectedStepId: number | null;
  selectedSocketId: string | null;
  isEditing: boolean;
};

export enum GraphActionType {
  // Step/Node actions
  AddStep = "ADD_STEP",
  DeleteStep = "DELETE_STEP",
  UpdateStepMetadata = "UPDATE_STEP_METADATA",
  // Socket actions
  AddSocket = "ADD_SOCKET",
  DeleteSocket = "DELETE_SOCKET",
  UpdateSocketId = "UPDATE_SOCKET_ID",
  UpdateSocketMetadata = "UPDATE_SOCKET_METADATA",
  // Edge actions
  AddEdge = "ADD_EDGE",
  DeleteEdge = "DELETE_EDGE",
  // Select/Focus actions
  SelectSocket = "SELECT_SOCKET",
  DeselectSocket = "DESELECT_SOCKET",
  // Special actions
  UpdateUserInputStep = "UPDATE_USER_INPUT_STEP",
}

interface BaseGraphAction {
  type: GraphActionType;
  payload: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface AddStepAction extends BaseGraphAction {
  type: GraphActionType.AddStep;
  payload: { stepType: StepType };
}

interface DeleteStepAction extends BaseGraphAction {
  type: GraphActionType.DeleteStep;
  payload: { stepId: number };
}

interface UpdateStepMetadataAction extends BaseGraphAction {
  type: GraphActionType.UpdateStepMetadata;
  payload: { stepId: number; stepMetadata: Record<string, any> }; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export enum SocketType {
  Input = "INPUT",
  Output = "OUTPUT",
}

interface AddSocketAction extends BaseGraphAction {
  type: GraphActionType.AddSocket;
  payload: { stepId: number; socketType: SocketType };
}

interface DeleteSocketAction extends BaseGraphAction {
  type: GraphActionType.DeleteSocket;
  payload: { stepId: number; socketId: string };
}

interface UpdateSocketIdAction extends BaseGraphAction {
  type: GraphActionType.UpdateSocketId;
  payload: { stepId: number; oldSocketId: string; newSocketId: string };
}

interface UpdateSocketMetadataAction extends BaseGraphAction {
  type: GraphActionType.UpdateSocketMetadata;
  payload: {
    stepId: number;
    socketId: string;
    socketMetadata: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

interface AddEdgeAction extends BaseGraphAction {
  type: GraphActionType.AddEdge;
  payload: { edge: GraphEdge };
}

interface DeleteEdgeAction extends BaseGraphAction {
  type: GraphActionType.DeleteEdge;
  payload: { edgeId: number };
}

interface SelectSocketAction extends BaseGraphAction {
  type: GraphActionType.SelectSocket;
  payload: { stepId: number; socketId: string };
}

interface DeselectSocketAction extends BaseGraphAction {
  type: GraphActionType.DeselectSocket;
}

interface UpdateUserInputStepAction extends BaseGraphAction {
  type: GraphActionType.UpdateUserInputStep;
  payload: { step: InputStep };
}

export type GraphAction =
  | AddStepAction
  | DeleteStepAction
  | UpdateStepMetadataAction
  | AddSocketAction
  | DeleteSocketAction
  | UpdateSocketIdAction
  | UpdateSocketMetadataAction
  | AddEdgeAction
  | DeleteEdgeAction
  | SelectSocketAction
  | DeselectSocketAction
  | UpdateUserInputStepAction;

const updateUserInputStep = (
  state: GraphState,
  { payload }: UpdateUserInputStepAction,
) => {
  // TEMP: Assume that input step is always the first step (at idx = 0)
  // This is currently guaranteed by `NodeGraph`
  // TODO: refactor this, this is so so so so so bad
  state.steps[0] = payload.step;
  return state;
};

const addStep = (state: GraphState, { payload }: AddStepAction) => {
  const baseStep: Step = {
    id: Math.max(...state.steps.map((node) => node.id), -1) + 1,
    type: payload.stepType,
    inputs: [{ id: "CONTROL.IN", data: null }],
    outputs: [{ id: "CONTROL.OUT", data: null }],
  };

  let newStep: Step;
  switch (payload.stepType) {
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
      newStep = { ...baseStep };
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

  state.steps.push(newStep);

  return state;
};

const deleteStep = (state: GraphState, { payload }: DeleteStepAction) => {
  state.steps = state.steps.filter((node) => node.id !== payload.stepId);
  state.edges.filter(
    (edge) =>
      edge.from_node_id !== payload.stepId &&
      edge.to_node_id !== payload.stepId,
  );

  if (state.selectedStepId === payload.stepId) {
    state.selectedStepId = null;
    state.selectedSocketId = null;
  }

  return state;
};

const updateStepMetadata = (
  state: GraphState,
  { payload }: UpdateStepMetadataAction,
) => {
  const stepIndex = state.steps.findIndex((node) => node.id === payload.stepId);
  state.steps[stepIndex] = {
    ...state.steps[stepIndex],
    ...payload.stepMetadata,
  };
  return state;
};

// Note: we only create data sockets with this method.
// All control sockets are created on initialisation and should not be changed
const addSocket = (state: GraphState, { payload }: AddSocketAction) => {
  const step = state.steps.find((node) => node.id === payload.stepId);
  if (!step) return state;

  const allIds = step.inputs
    .map((socket) => socket.id)
    .concat(step.outputs.map((socket) => socket.id));

  const socketIdPrefix = "DATA.TEMP";
  let socketUniqueSeed = 1;
  while (allIds.includes(`${socketIdPrefix}${socketUniqueSeed}`))
    socketUniqueSeed++;

  (payload.socketType === SocketType.Input ? step.inputs : step.outputs).push({
    id: `${socketIdPrefix}${socketUniqueSeed}`,
    data: null,
  });

  return state;
};

const deleteSocket = (state: GraphState, { payload }: DeleteSocketAction) => {
  const step = state.steps.find((node) => node.id === payload.stepId);
  if (!step) return state;

  step.inputs = step.inputs.filter((socket) => socket.id !== payload.socketId);
  step.outputs = step.outputs.filter(
    (socket) => socket.id !== payload.socketId,
  );

  state.edges = state.edges.filter(
    (edge) =>
      payload.stepId in [edge.from_node_id, edge.to_node_id] &&
      payload.socketId in [edge.from_socket_id, edge.to_socket_id],
  );

  state.selectedStepId =
    state.selectedStepId === payload.stepId ? null : state.selectedStepId;
  state.selectedSocketId =
    state.selectedSocketId === payload.socketId ? null : state.selectedSocketId;

  return state;
};

const updateSocketId = (
  state: GraphState,
  { payload }: UpdateSocketIdAction,
) => {
  const stepIndex = state.steps.findIndex((node) => node.id === payload.stepId);
  const step = state.steps[stepIndex];

  const socket =
    step.inputs.find((socket) => socket.id === payload.oldSocketId) ||
    step.outputs.find((socket) => socket.id === payload.oldSocketId);

  if (socket === undefined) return state;

  socket.id = payload.newSocketId;

  // Update name of socket for all edges it uses
  state.edges.forEach((edge) => {
    const from = edge.from_node_id === payload.stepId && edge.from_socket_id;
    const to = edge.to_node_id === payload.stepId && edge.to_socket_id;
    edge.from_socket_id = from ? payload.newSocketId : edge.from_socket_id;
    edge.to_socket_id = to ? payload.newSocketId : edge.to_socket_id;
  });

  if (!isFile(socket.data)) {
    state.selectedStepId =
      state.selectedStepId === payload.stepId ? null : state.selectedStepId;
    state.selectedSocketId =
      state.selectedSocketId === payload.oldSocketId ? null : state.selectedSocketId; // prettier-ignore
  }

  return state;
};

const updateSocketMetadata = (
  state: GraphState,
  { payload }: UpdateSocketMetadataAction,
) => {
  const step = state.steps.find((node) => node.id === payload.stepId);
  if (!step) return state;

  let socket =
    step.inputs.find((socket) => socket.id === payload.socketId) ||
    step.outputs.find((socket) => socket.id === payload.socketId);
  if (!socket) return state;

  socket = { ...socket, ...payload.socketMetadata };

  return state;
};

const selectSocket = (state: GraphState, { payload }: SelectSocketAction) => {
  const selectedStep = state.steps.find((node) => node.id === payload.stepId);
  if (!selectedStep) return state;

  // NOTE: This is used only for `InputStep` so far, so this is okay
  const selectedSocket = selectedStep.outputs.find(
    (socket) => socket.id === payload.socketId,
  );

  if (!selectedSocket) return state;

  state.selectedStepId = selectedStep.id;
  state.selectedSocketId = selectedSocket.id;

  return state;
};

const deselectSocket = (state: GraphState) => {
  state.selectedStepId = null;
  state.selectedSocketId = null;
  return state;
};

const addEdge = (state: GraphState, { payload }: AddEdgeAction) => {
  state.edges.push(payload.edge);
  return state;
};

const deleteEdge = (state: GraphState, { payload }: DeleteEdgeAction) => {
  state.edges = state.edges.filter((edge) => edge.id !== payload.edgeId);
  return state;
};

export const graphReducer: ImmerReducer<GraphState, GraphAction> = (
  state: GraphState,
  action: GraphAction,
): GraphState => {
  switch (action.type) {
    case GraphActionType.AddStep:
      return addStep(state, action);
    case GraphActionType.DeleteStep:
      return deleteStep(state, action);
    case GraphActionType.UpdateStepMetadata:
      return updateStepMetadata(state, action);
    case GraphActionType.AddSocket:
      return addSocket(state, action);
    case GraphActionType.DeleteSocket:
      return deleteSocket(state, action);
    case GraphActionType.UpdateSocketId:
      return updateSocketId(state, action);
    case GraphActionType.UpdateSocketMetadata:
      return updateSocketMetadata(state, action);
    case GraphActionType.SelectSocket:
      return selectSocket(state, action);
    case GraphActionType.DeselectSocket:
      return deselectSocket(state);
    case GraphActionType.AddEdge:
      return addEdge(state, action);
    case GraphActionType.DeleteEdge:
      return deleteEdge(state, action);
    case GraphActionType.UpdateUserInputStep:
      return updateUserInputStep(state, action);
  }
};

export const GraphContext = createContext<GraphState | null>(null);
export const GraphDispatchContext = createContext<Dispatch<GraphAction> | null>(
  null,
);
