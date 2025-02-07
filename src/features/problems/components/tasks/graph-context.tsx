import { createContext, Dispatch } from "react";
import { ImmerReducer } from "use-immer";

import {
  GraphEdge,
  InputStep,
  ParsedFunction,
  PyRunFunctionStep,
  StepType,
} from "@/api";
import { isFile } from "@/lib/types";

import { Step } from "./types";

export type GraphState = {
  id: string;
  steps: Step[];
  edges: GraphEdge[];
  selectedStepId: number | null;
  selectedSocketId: string | null;
  edit: boolean;
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
  UpdatePyRunFunctionStep = "UPDATE_FUNCTION_IDENTIFIER_STEP",
}

interface BaseGraphAction {
  type: GraphActionType;
  payload?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface AddStepAction extends BaseGraphAction {
  type: GraphActionType.AddStep;
  payload: { type: StepType };
}

interface DeleteStepAction extends BaseGraphAction {
  type: GraphActionType.DeleteStep;
  payload: { id: number };
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
  payload: {
    from_node_id: number;
    from_socket_id: string;
    to_node_id: number;
    to_socket_id: string;
  };
}

interface DeleteEdgeAction extends BaseGraphAction {
  type: GraphActionType.DeleteEdge;
  payload: { id: number };
}

interface SelectSocketAction extends BaseGraphAction {
  type: GraphActionType.SelectSocket;
  payload: { stepId: number; socketId: string };
}

interface DeselectSocketAction extends BaseGraphAction {
  type: GraphActionType.DeselectSocket;
}

interface DeselectSocketAction extends BaseGraphAction {
  type: GraphActionType.DeselectSocket;
}

interface UpdateUserInputStepAction extends BaseGraphAction {
  type: GraphActionType.UpdateUserInputStep;
  payload: { step: InputStep };
}

interface UpdatePyRunFunctionStepAction extends BaseGraphAction {
  type: GraphActionType.UpdatePyRunFunctionStep;
  payload: {
    stepId: number;
    functionIdentifier: string;
    functionSignature?: ParsedFunction;
    allowError: boolean;
  };
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
  | UpdateUserInputStepAction
  | UpdatePyRunFunctionStepAction;

const updateUserInputStep = (
  state: GraphState,
  { payload }: UpdateUserInputStepAction,
) => {
  const userInputStepIdx = state.steps.findIndex((node) => node.id === 0);
  if (userInputStepIdx !== -1) state.steps[userInputStepIdx] = payload.step;
  return state;
};

const updatePyRunFunctionStep = (
  state: GraphState,
  { payload }: UpdatePyRunFunctionStepAction,
) => {
  const stepIndex = state.steps.findIndex((node) => node.id === payload.stepId);
  const step = state.steps[stepIndex] as PyRunFunctionStep;

  // Detect changes
  const functionIdentifierChanged =
    step.function_identifier !== payload.functionIdentifier;
  const functionSignatureChanged = payload.functionSignature !== undefined;
  const allowErrorChanged = step.allow_error !== payload.allowError;

  if (functionIdentifierChanged) {
    // 1. Update the identifier.
    state.steps[stepIndex] = {
      ...state.steps[stepIndex],
      function_identifier: payload.functionIdentifier,
    };
  }

  if (functionSignatureChanged && payload.functionSignature) {
    // 1. Remove all edges connected to the node except the file edge.
    state.edges = state.edges.filter(
      (edge) =>
        edge.to_node_id !== payload.stepId ||
        edge.to_socket_id === "DATA.IN.FILE",
    );
    // 2. Replace the input sockets with arguments of the new function signature.
    const functionInputs = payload.functionSignature.args
      .map((arg, index) => ({
        id: `DATA.IN.ARG.${index}.${arg}`,
        data: null,
      }))
      .concat(
        payload.functionSignature.kwargs.map((kwarg) => ({
          id: `DATA.IN.KWARG.${kwarg}`,
          data: null,
        })),
      );

    state.steps[stepIndex].inputs = [
      { id: "CONTROL.IN", data: null },
      { id: "DATA.IN.FILE", data: null },
      ...functionInputs,
    ];
  }

  if (allowErrorChanged) {
    // If allow error is changed to true, add a new output socket.
    // If allow error is changed to false, remove the output socket and outgoing edges.
    state.steps[stepIndex] = {
      ...state.steps[stepIndex],
      allow_error: payload.allowError,
    };
    if (payload.allowError) {
      state.steps[stepIndex].outputs.push({
        id: "DATA.OUT.ERROR",
        data: null,
      });
    } else {
      state.steps[stepIndex].outputs = state.steps[stepIndex].outputs.filter(
        (socket) => socket.id !== "DATA.OUT.ERROR",
      );
      state.edges = state.edges.filter(
        (edge) =>
          edge.from_node_id !== payload.stepId ||
          edge.from_socket_id !== "DATA.OUT.ERROR",
      );
    }
  }

  return state;
};

const addStep = (state: GraphState, { payload }: AddStepAction) => {
  const baseStep: Step = {
    id: Math.max(...state.steps.map((node) => node.id), 0) + 1,
    type: payload.type,
    inputs: [{ id: "CONTROL.IN", data: null }],
    outputs: [{ id: "CONTROL.OUT", data: null }],
  };

  let newStep: Step;
  switch (payload.type) {
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
  state.steps = state.steps.filter((node) => node.id !== payload.id);
  state.edges.filter(
    (edge) =>
      edge.from_node_id !== payload.id && edge.to_node_id !== payload.id,
  );

  if (state.selectedStepId === payload.id) {
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

  const socket =
    step.inputs.find((socket) => socket.id === payload.socketId) ||
    step.outputs.find((socket) => socket.id === payload.socketId);
  if (!socket) return state;

  Object.assign(socket, payload.socketMetadata);

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

const deselectSocket = (state: GraphState, _action: DeselectSocketAction) => {
  state.selectedStepId = null;
  state.selectedSocketId = null;
  return state;
};

const addEdge = (state: GraphState, { payload }: AddEdgeAction) => {
  // Find unique ID for the new edge
  const newEdgeId = Math.max(...state.edges.map((edge) => edge.id), -1) + 1;
  state.edges.push({ id: newEdgeId, ...payload });
  return state;
};

const deleteEdge = (state: GraphState, { payload }: DeleteEdgeAction) => {
  state.edges = state.edges.filter((edge) => edge.id !== payload.id);
  return state;
};

const actionHandlers = {
  [GraphActionType.AddStep]: addStep,
  [GraphActionType.DeleteStep]: deleteStep,
  [GraphActionType.UpdateStepMetadata]: updateStepMetadata,
  [GraphActionType.AddSocket]: addSocket,
  [GraphActionType.DeleteSocket]: deleteSocket,
  [GraphActionType.UpdateSocketId]: updateSocketId,
  [GraphActionType.UpdateSocketMetadata]: updateSocketMetadata,
  [GraphActionType.SelectSocket]: selectSocket,
  [GraphActionType.DeselectSocket]: deselectSocket,
  [GraphActionType.AddEdge]: addEdge,
  [GraphActionType.DeleteEdge]: deleteEdge,
  [GraphActionType.UpdateUserInputStep]: updateUserInputStep,
  [GraphActionType.UpdatePyRunFunctionStep]: updatePyRunFunctionStep,
};

export const graphReducer: ImmerReducer<GraphState, GraphAction> = (
  state: GraphState,
  action: GraphAction,
): GraphState => {
  return actionHandlers[action.type](state, action as any); // eslint-disable-line @typescript-eslint/no-explicit-any
};

export const GraphContext = createContext<GraphState | null>(null);
export const GraphDispatchContext = createContext<Dispatch<GraphAction> | null>(
  null,
);
