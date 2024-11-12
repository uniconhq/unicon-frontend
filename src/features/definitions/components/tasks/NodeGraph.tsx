import "@xyflow/react/dist/style.css";

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge as FlowEdge,
  EdgeChange,
  MiniMap,
  Node as FlowNode,
  NodeChange,
  ReactFlow,
} from "@xyflow/react";
import { useMemo, useState } from "react";

import { StepNode } from "@/components/node-graph/components/StepNode";
import { GraphEdge, Step } from "@/api";

type OwnProps = {
  steps: Step[];
  edges: GraphEdge[];
};

const NodeGraph: React.FC<OwnProps> = ({ steps, edges }) => {
  const nodeTypes = useMemo(() => ({ step: StepNode }), []);

  const nodeData = useMemo(
    () =>
      steps.map((step, index) => ({
        id: step.id.toString(),
        position: { x: index * 200, y: 0 },
        data: step,
        type: "step",
      })),
    [steps],
  );

  const edgeData = useMemo(
    () =>
      edges.map((edge) => ({
        id: edge.id.toString(),
        source: edge.from_node_id.toString(),
        sourceHandle: edge.from_socket_id,
        target: edge.to_node_id.toString(),
        targetHandle: edge.to_socket_id,
      })),
    [edges],
  );

  console.log({ nodeData, edgeData });

  const [reactFlowNodes, setReactFlowNodes] = useState(nodeData);
  const [reactFlowEdges, setReactFlowEdges] = useState(edgeData);

  return (
    <div className="grid grid-cols-6 gap-1">
      <div className="col-span-4 h-[60vh] w-full">
        {reactFlowNodes && (
          <ReactFlow
            style={{ height: "30vh", width: "100vw" }}
            nodeTypes={nodeTypes}
            nodes={reactFlowNodes}
            edges={reactFlowEdges}
            onNodesChange={(changes: NodeChange<FlowNode<Step>>[]) =>
              setReactFlowNodes((reactFlowNodes) =>
                applyNodeChanges(changes, reactFlowNodes),
              )
            }
            onEdgesChange={(changes: EdgeChange<FlowEdge>[]) =>
              setReactFlowEdges((reactFlowEdges) =>
                applyEdgeChanges(changes, reactFlowEdges),
              )
            }
            onConnect={(connection: Connection) =>
              setReactFlowEdges((reactFlowEdges) =>
                addEdge(connection, reactFlowEdges),
              )
            }
            colorMode="dark"
            fitView
            fitViewOptions={{ maxZoom: 1.0 }}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        )}
      </div>
    </div>
  );
};

export default NodeGraph;
