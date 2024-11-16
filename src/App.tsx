import "@xyflow/react/dist/style.css";

import { Editor } from "@monaco-editor/react";
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
import { AiOutlinePython } from "react-icons/ai";

import { Node } from "@/components/node-graph/components/Node";
import { testEdges, testNodes } from "@/data/test";
import { NodeData } from "@/lib/types";

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
