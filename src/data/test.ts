import { NodeData, NodeType } from "../lib/types";
import { Node as FlowNode, Edge as FlowEdge } from "@xyflow/react";

export const testNodes: FlowNode<NodeData>[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 0, y: 0 },
    data: { label: "User", type: NodeType.USER, course: "CS2109S" },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 10, y: 0 },
    data: { label: "User", type: NodeType.USER, course: "CS3234" },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 20, y: 0 },
    data: {
      label: "Task",
      type: NodeType.TASK,
      participants: {
        n: 1,
        isGroup: true,
      },
      numArtifacts: 1,
    },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 30, y: 0 },
    data: {
      label: "Task",
      type: NodeType.TASK,
      participants: {
        n: 2,
        isGroup: false,
      },
      numArtifacts: 3,
    },
  },
  {
    id: "5",
    type: "custom",
    position: { x: 40, y: 0 },
    data: { label: "Group", type: NodeType.GROUP, minUsers: 1, maxUsers: 3 },
  },
  {
    id: "6",
    type: "custom",
    position: { x: 50, y: 0 },
    data: { label: "Artifact", type: NodeType.ARTIFACT, fileType: "pdf" },
  },
  {
    id: "7",
    type: "custom",
    position: { x: 60, y: 0 },
    data: { label: "Artifact", type: NodeType.ARTIFACT, fileType: "py" },
  },
];

export const testEdges: FlowEdge[] = [
  {
    id: "e1-5",
    source: "5",
    target: "1",
    targetHandle: "User.Out",
    sourceHandle: "Group.In.0",
  },
  {
    id: "e1-4",
    source: "4",
    target: "1",
    targetHandle: "User.Out",
    sourceHandle: "Task.In.User.0",
  },
  {
    id: "e2-5",
    source: "5",
    target: "2",
    targetHandle: "User.Out",
    sourceHandle: "Group.In.1",
  },
  {
    id: "e2-4",
    source: "4",
    target: "2",
    targetHandle: "User.Out",
    sourceHandle: "Task.In.User.1",
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    targetHandle: "Group.Out",
    sourceHandle: "Task.In.Group.0",
  },
  {
    id: "e3-6",
    source: "3",
    target: "6",
    targetHandle: "Artifact.Out",
    sourceHandle: "Task.In.Artifact.0",
  },
  {
    id: "e4-7",
    source: "4",
    target: "7",
    targetHandle: "Artifact.Out",
    sourceHandle: "Task.In.Artifact.0",
  },
].map((edge) => ({ ...edge, animated: true }));
