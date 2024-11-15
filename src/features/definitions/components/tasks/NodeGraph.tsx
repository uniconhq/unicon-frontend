import "@xyflow/react/dist/style.css";

import Dagre from "@dagrejs/dagre";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  MiniMap,
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

const getLayoutedElements = (nodes, edges) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: "LR",
  });

  nodes = nodes.map((node) => {
    const domNode = document.querySelector(`[data-id="${node?.id}"]`);
    if (!domNode) {
      console.log("could not find node: ", node.id);
      return;
    }
    const { width, height } = domNode.getBoundingClientRect();
    // There is a scale of 0.5 on the graph element
    return { ...node, measured: { width: width * 0.5, height: height * 0.5 } };
  });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => {
    // TODO: fix measurements to node's measurement
    const domNode = document.querySelector(`[data-id="${node?.id}"]`);
    if (!domNode) {
      return;
    }
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width,
      height: node.measured?.height,
    });
  });

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      console.log({ ...node, position: { x, y } });

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

type OwnProps = {
  steps: Step[];
  edges: GraphEdge[];
};

const NodeGraph: React.FC<OwnProps> = ({ steps, edges }) => {
  const { fitView } = useReactFlow();
  const initialized = useNodesInitialized(); // Track if nodes are initialized
  const [ran, setRan] = useState(false);

  const nodeTypes = useMemo(() => ({ step: StepNode }), []);

  const nodeData = useMemo(
    () =>
      steps.map((step) => ({
        id: step.id.toString(),
        position: { x: 0, y: 0 },
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
        animated: true,
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
      {},
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
  }, [initialized]);
  // const [, , dragEvents] = useLayoutedElements();

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
