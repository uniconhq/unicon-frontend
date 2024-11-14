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
  ReactFlowProvider,
  useNodesInitialized,
  useReactFlow,
} from "@xyflow/react";
import {
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from "d3-force";
import { useMemo, useRef, useState } from "react";

import { GraphEdge, Step } from "@/api";
import { StepNode } from "@/components/node-graph/components/StepNode";
import collide from "@/utils/collide";

const simulation = forceSimulation()
  .force("charge", forceManyBody().strength(-1500))
  .force("x", forceX().x(0).strength(0.01))
  .force("y", forceY().y(0).strength(0.01))
  .force("collide", collide())
  .alphaTarget(0.05)
  .stop();

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const initialized = useNodesInitialized();

  // You can use these events if you want the flow to remain interactive while
  // the simulation is running. The simulation is typically responsible for setting
  // the position of nodes, but if we have a reference to the node being dragged,
  // we use that position instead.
  const draggingNodeRef = useRef<Node>(null);
  const dragEvents = useMemo(
    () => ({
      start: (_event: never, node: Node) => (draggingNodeRef.current = node),
      drag: (_event: never, node: Node) => (draggingNodeRef.current = node),
      stop: () => (draggingNodeRef.current = null),
    }),
    [],
  );

  return useMemo(() => {
    const nodes = getNodes().map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }));
    const edges = getEdges().map((edge) => edge);
    let running = true;

    // If React Flow hasn't initialized our nodes with a width and height yet, or
    // if there are no nodes in the flow, then we can't run the simulation!
    if (!initialized || nodes.length === 0) return [false, {}, dragEvents];

    console.log({ nodes, edges });
    simulation.nodes(nodes).force(
      "link",
      forceLink(edges)
        .id((d) => d.id)
        .strength(0.05)
        .distance(200),
    );

    // The tick function is called every animation frame while the simulation is
    // running and progresses the simulation one step forward each time.
    const tick = () => {
      getNodes().forEach((node, i) => {
        const dragging = draggingNodeRef.current?.id === node.id;

        // Setting the fx/fy properties of a node tells the simulation to "fix"
        // the node at that position and ignore any forces that would normally
        // cause it to move.
        if (dragging && draggingNodeRef.current) {
          nodes[i].fx = draggingNodeRef.current.position.x;
          nodes[i].fy = draggingNodeRef.current.position.y;
        } else {
          delete nodes[i].fx;
          delete nodes[i].fy;
        }
      });

      simulation.tick();
      setNodes(
        nodes.map((node) => ({
          ...node,
          position: { x: node.fx ?? node.x, y: node.fy ?? node.y },
        })),
      );

      window.requestAnimationFrame(() => {
        // Give React and React Flow a chance to update and render the new node
        // positions before we fit the viewport to the new layout.
        fitView();

        // If the simulation hasn't been stopped, schedule another tick.
        if (running) tick();
      });
    };

    const toggle = () => {
      if (!running) {
        getNodes().forEach((node, index) => {
          const simNode = nodes[index];
          Object.assign(simNode, node);
          simNode.x = node.position.x;
          simNode.y = node.position.y;
        });
      }
      running = !running;
      if (running) window.requestAnimationFrame(tick);
    };

    const isRunning = () => running;

    tick();

    return [true, { toggle, isRunning }, dragEvents];
  }, [initialized, dragEvents, getNodes, getEdges, setNodes, fitView]);
};

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
        position: { x: index * 300, y: 0 },
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

  const [reactFlowNodes, setReactFlowNodes] = useState(nodeData);
  const [reactFlowEdges, setReactFlowEdges] = useState(edgeData);
  const [, , dragEvents] = useLayoutedElements();

  return (
    <div className="grid grid-cols-6 gap-1">
      <div className="col-span-4 h-[60vh] w-full">
        {reactFlowNodes && (
          <ReactFlow
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
            onNodeDragStart={dragEvents.start}
            onNodeDrag={dragEvents.drag}
            onNodeDragStop={dragEvents.stop}
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
