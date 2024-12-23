import { File as FileType } from "@/api";
import {
  IfElseStep,
  InputStep,
  LoopStep,
  ObjectAccessStep,
  OutputStep,
  PyRunFunctionStep,
  StringMatchStep,
} from "@/api";

export enum NodeType {
  USER,
  GROUP,
  ARTIFACT,
  TASK,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface INodeData extends Record<string, any> {
  label: string;
  type: NodeType;
}

export interface UserNodeData extends INodeData {
  label: "User";
  type: NodeType.USER;
  course: string;
}

export interface GroupNodeData extends INodeData {
  label: "Group";
  type: NodeType.GROUP;
  minUsers: number;
  maxUsers: number;
}

export interface ArtifactNodeData extends INodeData {
  label: "Artifact";
  type: NodeType.ARTIFACT;
  fileType: string;
}

export interface TaskNodeData extends INodeData {
  label: "Task";
  type: NodeType.TASK;
  participants: {
    n: number;
    isGroup: boolean;
  };
  numArtifacts: number;
}

export type NodeData =
  | UserNodeData
  | GroupNodeData
  | TaskNodeData
  | ArtifactNodeData;

export const isFile = (data: unknown): data is FileType => {
  if (data === undefined || data === null) {
    return false;
  }
  return (
    (data as FileType).name !== undefined &&
    (data as FileType).content !== undefined
  );
};
export type Step =
  | OutputStep
  | InputStep
  | PyRunFunctionStep
  | LoopStep
  | IfElseStep
  | StringMatchStep
  | ObjectAccessStep;
