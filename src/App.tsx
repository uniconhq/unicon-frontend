import { useMemo, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  Node as FlowNode,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  Edge as FlowEdge,
  Connection,
  MiniMap,
} from "@xyflow/react";
import { AiOutlinePython } from "react-icons/ai";

import "@xyflow/react/dist/style.css";
import { Node } from "@/features/node-graph/components/Node";
import { NodeData } from "./lib/types";
import { Editor } from "@monaco-editor/react";
import { testEdges, testNodes } from "./data/test";

export default function App() {
  const nodeTypes = useMemo(() => ({ custom: Node }), []);

  const [nodes, setNodes] = useState(testNodes);
  const [edges, setEdges] = useState(testEdges);

  return (
    <div className="grid h-full w-full grid-cols-6 gap-1">
      <div className="col-span-2 flex flex-col">
        <div className="flex items-center rounded-t-lg bg-[#1E1E1E] p-2 text-xs text-slate-300">
          <AiOutlinePython className="mr-2" size={15} />
          Code Editor
        </div>
        <Editor
          theme="vs-dark"
          defaultLanguage="python"
          options={{ padding: { top: 5 } }}
        />
      </div>
      <div className="col-span-4">
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes: NodeChange<FlowNode<NodeData>>[]) =>
            setNodes((nodes) => applyNodeChanges(changes, nodes))
          }
          onEdgesChange={(changes: EdgeChange<FlowEdge>[]) =>
            setEdges((edges) => applyEdgeChanges(changes, edges))
          }
          onConnect={(connection: Connection) =>
            setEdges((edges) => addEdge(connection, edges))
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
      </div>
    </div>
  );
}
