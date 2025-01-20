import "@xyflow/react/dist/style.css";

import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
  useNodesInitialized,
  useReactFlow,
} from "@xyflow/react";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { StepNode } from "@/components/node-graph/components/step/step-node";
import getLayoutedElements from "@/utils/graph";

import AddNodeButton from "./add-node-button";
import { GraphContext, GraphDispatchContext } from "./graph-context";
import { Step } from "./types";

const GraphView: React.FC = () => {
  const { fitView } = useReactFlow();
  const initialized = useNodesInitialized(); // Track if nodes are initialized
  const [ran, setRan] = useState(false);

  const nodeTypes = useMemo(() => ({ step: StepNode }), []);

  const { steps, edges, isEditing } = useContext(GraphContext)!;
  const dispatch = useContext(GraphDispatchContext)!;

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

  const [reactFlowNodes, setReactFlowNodes] = useState(nodeData);
  const [reactFlowEdges, setReactFlowEdges] = useState(edgeData);

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
    // keep old positions...
    setReactFlowNodes((reactFlowNodes) => {
      const nodeDataModified = nodeData.map((node) => {
        const oldNode = reactFlowNodes.find((n) => n.id === node.id);
        return {
          ...node,
          position: oldNode?.position || node.position,
        };
      });
      return nodeDataModified;
    });
  }, [nodeData]);

  useEffect(() => {
    setReactFlowEdges(edgeData);
  }, [edgeData]);

  useEffect(() => {
    if (initialized && !ran) {
      onLayout(); // Trigger layout once nodes are initialized
      setTimeout(fitView, 100);
      setRan(true);
    }
  }, [fitView, initialized, onLayout, ran]);

  const onNodesChange: OnNodesChange<Node<Step>> = useCallback(
    (changes) => {
      setReactFlowNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setReactFlowNodes],
  );

  const onEdgesChange: OnEdgesChange<Edge> = useCallback((changes) => {
    setReactFlowEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => {
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
    [dispatch, edges],
  );

  const edgeReconnectSuccessful = useRef(true);

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
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
      //   setReactFlowEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    },
    [dispatch, edges],
  );

  const onReconnectEnd = useCallback(
    (_: unknown, edge: Edge) => {
      if (!edgeReconnectSuccessful.current) {
        dispatch({
          type: "DELETE_EDGE",
          edgeId: parseInt(edge.id),
        });
        setReactFlowEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeReconnectSuccessful.current = true;
    },
    [dispatch],
  );

  return (
    <div className="relative h-[60vh] w-full">
      {isEditing && <AddNodeButton />}
      {reactFlowNodes && (
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={reactFlowNodes}
          edges={reactFlowEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onReconnectStart={onReconnectStart}
          onReconnectEnd={onReconnectEnd}
          onReconnect={onReconnect}
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
  );
};

export default GraphView;
