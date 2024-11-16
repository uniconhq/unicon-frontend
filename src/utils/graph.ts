import Dagre from "@dagrejs/dagre";
import { Edge, Node } from "@xyflow/react";

function getLayoutedElements<T extends Record<string, unknown>>(
  nodes: Node<T>[],
  edges: Edge[],
) {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: "LR",
  });

  const measuredNodes = nodes.map((node) => {
    const domNode = document.querySelector(`[data-id="${node?.id}"]`);
    if (!domNode) {
      throw Error("could not find node: " + node.id);
    }
    const { width, height } = domNode.getBoundingClientRect();
    // There is a scale of 0.5 on the graph element
    return { ...node, measured: { width: width * 0.5, height: height * 0.5 } };
  });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  measuredNodes.forEach((node) => {
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

      return { ...node, position: { x, y } };
    }),
    edges,
  };
}

export default getLayoutedElements;
