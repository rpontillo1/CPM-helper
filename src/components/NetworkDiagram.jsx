import { useMemo } from "react";
import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import EventNode from "./Event";
import { createGraph } from "../utils/createGraph";

const nodeTypes = {
  eventNode: EventNode,
};

export default function NetworkDiagram({ tasks }) {
  const { nodes, edges } = useMemo(() => {
    const graph = createGraph(tasks);

    return {
      nodes: graph.nodes,
      edges: graph.edges.map((edge) => ({
        ...edge,
        markerEnd: {
          ...edge.markerEnd,
          type: MarkerType.ArrowClosed,
        },
      })),
    };
  }, [tasks]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
      >
        <Background gap={24} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
