import "@xyflow/react/dist/style.css";

import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesInitialized,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { GraphEdge, Step } from "@/api";
import { StepNode } from "@/components/node-graph/components/StepNode";
import getLayoutedElements from "@/utils/graph";

type OwnProps = {
  steps: Step[];
  edges: GraphEdge[];
};

const NodeGraph: React.FC<OwnProps> = ({ steps, edges }) => {
  const { fitView } = useReactFlow();
  const initialized = useNodesInitialized(); // Track if nodes are initialized
  const [ran, setRan] = useState(false);

  const nodeTypes = useMemo(() => ({ step: StepNode }), []);

  const nodeData: Node<Step>[] = useMemo(
    () =>
      steps.map((step) => ({
        id: step.id.toString(),
        position: { x: 0, y: 0 },
        data: step,
        type: "step",
      })),
    [steps],
  );

  const edgeData: Edge[] = useMemo(
    () =>
      edges.map((edge) => ({
        id: edge.id.toString(),
        source: edge.from_node_id.toString(),
        sourceHandle: edge.from_socket_id,
        target: edge.to_node_id.toString(),
        targetHandle: edge.to_socket_id,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        },
      })),
    [edges],
  );

  const [reactFlowNodes, setReactFlowNodes, onNodesChange] =
    useNodesState(nodeData);
  const [reactFlowEdges, setReactFlowEdges, onEdgesChange] =
    useEdgesState(edgeData);

  const onLayout = useCallback(() => {
    if (!initialized) {
      return;
    }

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodeData,
      edgeData,
    );

    setReactFlowNodes([...layoutedNodes]);
    setReactFlowEdges([...layoutedEdges]);

    window.requestAnimationFrame(() => {
      fitView();
    });
  }, [
    initialized,
    nodeData,
    edgeData,
    setReactFlowNodes,
    setReactFlowEdges,
    fitView,
  ]);

  useEffect(() => {
    if (initialized && !ran) {
      onLayout(); // Trigger layout once nodes are initialized
      setTimeout(fitView, 100);
      setRan(true);
    }
  }, [fitView, initialized, onLayout, ran]);

  return (
    <div className="grid gap-1">
      <div className="h-[60vh] w-full">
        {reactFlowNodes && (
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={reactFlowNodes}
            edges={reactFlowEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={(connection: Connection) =>
              setReactFlowEdges((reactFlowEdges) =>
                addEdge(connection, reactFlowEdges),
              )
            }
            colorMode="dark"
            fitView
            // fitViewOptions={{ maxZoom: 1.0 }}
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

export default function TestcaseNodeGraph(props: OwnProps) {
  return (
    <ReactFlowProvider>
      <NodeGraph {...props} />
    </ReactFlowProvider>
  );
}
