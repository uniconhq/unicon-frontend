import "@xyflow/react/dist/style.css";

import {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  ReactFlow,
  ReactFlowInstance,
  useEdgesState,
  useNodesInitialized,
  useNodesState,
} from "@xyflow/react";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { GraphEdge } from "@/api";
import { StepNode } from "@/components/node-graph/components/step/step-node";
import getLayoutedElements from "@/utils/graph";

import AddNodeButton from "./add-node-button";
import { GraphContext, GraphDispatchContext } from "./graph-context";
import { Step } from "./types";

const nodeTypes = { step: StepNode };

const stepNodeToRfNode = (step: Step): Node<Step> => ({
  id: step.id.toString(),
  position: { x: 0, y: 0 },
  data: step,
  type: "step",
});

const stepEdgeToRfEdge = (edge: GraphEdge): Edge => ({
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
});

type RfInstance = ReactFlowInstance<Node<Step>, Edge>;

const GraphView: React.FC = () => {
  const { steps, edges, isEditing } = useContext(GraphContext)!;

  const nodeData = useMemo(() => steps.map(stepNodeToRfNode), [steps]);
  const edgeData = useMemo(() => edges.map(stepEdgeToRfEdge), [edges]);

  const flowNodesInitialized = useNodesInitialized();
  const [layoutApplied, setLayoutApplied] = useState(false);
  const [rfInstance, setRfInstance] = useState<RfInstance | null>(null);
  const [flowNodes, setFlowNodes, onFlowNodesChange] = useNodesState(nodeData);
  const [flowEdges, setFlowEdges, onFlowEdgesChange] = useEdgesState(edgeData);

  const onInit = (rf: RfInstance) => setRfInstance(rf);

  useEffect(() => {
    if (!flowNodesInitialized || layoutApplied) return;

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      flowNodes,
      flowEdges,
    );
    setFlowNodes([...layoutedNodes]);
    setFlowEdges([...layoutedEdges]);

    setLayoutApplied(true);
  }, [
    flowNodesInitialized,
    layoutApplied,
    flowNodes,
    flowEdges,
    setFlowNodes,
    setFlowEdges,
  ]);

  useEffect(() => {
    if (!layoutApplied || !rfInstance) return;
    rfInstance.fitView();
  }, [layoutApplied, rfInstance]);

  useEffect(() => {
    const newNodes = nodeData.filter(
      (node) => !flowNodes.some((n) => n.id === node.id),
    );
    setFlowNodes((nodes) => [...nodes, ...newNodes]);
  }, [nodeData, flowNodes, setFlowNodes]);

  useEffect(() => setFlowEdges(edgeData), [edgeData, setFlowEdges]);

  const dispatch = useContext(GraphDispatchContext)!;

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!isEditing) return;

      dispatch({
        type: "ADD_EDGE",
        edge: {
          id: Math.max(...edges.map((edge) => edge.id), -1) + 1,
          from_node_id: parseInt(connection.source),
          from_socket_id: connection.sourceHandle!,
          to_node_id: parseInt(connection.target),
          to_socket_id: connection.targetHandle!,
        },
      });
    },
    [dispatch, edges, isEditing],
  );

  const edgeReconnectSuccessful = useRef(true);

  const onReconnectStart = useCallback(() => {
    if (!isEditing) return;
    edgeReconnectSuccessful.current = false;
  }, [isEditing]);

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      if (!isEditing) return;

      dispatch({
        type: "DELETE_EDGE",
        edgeId: parseInt(oldEdge.id),
      });
      dispatch({
        type: "ADD_EDGE",
        edge: {
          id: Math.max(...edges.map((edge) => edge.id), -1) + 1,
          from_node_id: parseInt(newConnection.source),
          from_socket_id: newConnection.sourceHandle!,
          to_node_id: parseInt(newConnection.target),
          to_socket_id: newConnection.targetHandle!,
        },
      });
      edgeReconnectSuccessful.current = true;
    },
    [dispatch, edges, isEditing],
  );

  const onReconnectEnd = useCallback(
    (_: unknown, edge: Edge) => {
      if (!isEditing) return;

      if (!edgeReconnectSuccessful.current) {
        dispatch({
          type: "DELETE_EDGE",
          edgeId: parseInt(edge.id),
        });
        setFlowEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeReconnectSuccessful.current = true;
    },
    [dispatch, setFlowEdges, isEditing],
  );

  return (
    <div className="relative h-[60vh] w-full">
      {isEditing && <AddNodeButton />}
      <ReactFlow
        onInit={onInit}
        nodeTypes={nodeTypes}
        nodes={flowNodes}
        edges={flowEdges}
        onNodesChange={onFlowNodesChange}
        onEdgesChange={onFlowEdgesChange}
        onConnect={onConnect}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
        onReconnect={onReconnect}
        nodesConnectable={isEditing}
        fitView={true}
        colorMode="dark"
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls showInteractive={isEditing} />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default GraphView;
