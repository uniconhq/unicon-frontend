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
import { ExpandIcon, ShrinkIcon } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import getLayoutedElements from "@/utils/graph";

import AddNodeButton from "./add-node-button";
import {
  GraphActionType,
  GraphContext,
  GraphDispatchContext,
} from "./graph-context";
import GraphFileEditor from "./graph-file-editor";
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

type GraphEditorProps = {
  graphId: string;
  className?: string;
};

const GraphEditor: React.FC<GraphEditorProps> = ({ graphId, className }) => {
  const { steps, edges, isEditing, selectedSocketId } =
    useContext(GraphContext)!;

  const nodeData = useMemo(() => steps.map(stepNodeToRfNode), [steps]);
  const edgeData = useMemo(() => edges.map(stepEdgeToRfEdge), [edges]);

  const flowNodesInitialized = useNodesInitialized();
  const [layoutApplied, setLayoutApplied] = useState(false);
  const [rfInstance, setRfInstance] = useState<RfInstance | null>(null);
  const [flowNodes, setFlowNodes, onFlowNodesChange] = useNodesState(nodeData);
  const [flowEdges, setFlowEdges, onFlowEdgesChange] = useEdgesState(edgeData);

  const [expanded, setExpanded] = useState(false);

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
  }, [flowNodesInitialized, layoutApplied]);

  useEffect(() => {
    if (!layoutApplied || !rfInstance) return;
    rfInstance.fitView();
  }, [layoutApplied, rfInstance]);

  useEffect(() => {
    setFlowNodes(
      nodeData.map((node) => {
        const existingRfNode = flowNodes.find((n) => n.id === node.id);
        return existingRfNode ? { ...existingRfNode, data: node.data } : node;
      }),
    );
  }, [nodeData, flowNodes, setFlowNodes]);

  useEffect(() => setFlowEdges(edgeData), [edgeData, setFlowEdges]);

  const dispatch = useContext(GraphDispatchContext)!;

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!isEditing) return;

      dispatch({
        type: GraphActionType.AddEdge,
        payload: {
          from_node_id: parseInt(connection.source),
          from_socket_id: connection.sourceHandle!,
          to_node_id: parseInt(connection.target),
          to_socket_id: connection.targetHandle!,
        },
      });
    },
    [dispatch, isEditing],
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
        type: GraphActionType.DeleteEdge,
        payload: { id: parseInt(oldEdge.id) },
      });
      dispatch({
        type: GraphActionType.AddEdge,
        payload: {
          from_node_id: parseInt(newConnection.source),
          from_socket_id: newConnection.sourceHandle!,
          to_node_id: parseInt(newConnection.target),
          to_socket_id: newConnection.targetHandle!,
        },
      });
      edgeReconnectSuccessful.current = true;
    },
    [dispatch, isEditing],
  );

  const onReconnectEnd = useCallback(
    (_: unknown, edge: Edge) => {
      if (!isEditing) return;

      if (!edgeReconnectSuccessful.current) {
        dispatch({
          type: GraphActionType.DeleteEdge,
          payload: { id: parseInt(edge.id) },
        });
        setFlowEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeReconnectSuccessful.current = true;
    },
    [dispatch, setFlowEdges, isEditing],
  );

  return (
    <div
      className={cn("grid gap-1", className, {
        "grid-cols-5": selectedSocketId,
        "fixed inset-0 z-30 h-full bg-black/100 animate-in fade-in": expanded,
      })}
      data-state={expanded ? "open" : "closed"}
    >
      {selectedSocketId && (
        <div className="col-span-2">
          <GraphFileEditor />
        </div>
      )}
      <div className={selectedSocketId ? "col-span-3" : ""}>
        <ReactFlow
          id={graphId}
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
          colorMode="dark"
          proOptions={{ hideAttribution: true }}
        >
          {/* Custom controls */}
          <div
            className={cn(
              "absolute right-1 top-1 z-10 mt-4 flex space-x-1 px-2",
              { "z-30": expanded },
            )}
          >
            {isEditing && <AddNodeButton />}
            <Button
              onClick={() => setExpanded((prev) => !prev)}
              type="button"
              variant="outline"
            >
              {expanded ? <ShrinkIcon /> : <ExpandIcon />}
            </Button>
          </div>
          <Background variant={BackgroundVariant.Dots} />
          <Controls showInteractive={isEditing} />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};

export default GraphEditor;
