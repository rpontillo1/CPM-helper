import dagre from "@dagrejs/dagre";

const NODE_WIDTH = 190;
const NODE_HEIGHT = 130;

export function createGraph(tasks) {
  const graph = new dagre.graphlib.Graph();

  graph.setDefaultEdgeLabel(() => ({}));

  graph.setGraph({
    rankdir: "LR",
    ranksep: 100,
    nodesep: 70,
    marginx: 40,
    marginy: 40,
  });

  tasks.forEach((task) => {
    graph.setNode(task.id, {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });
  });

  tasks.forEach((task) => {
    task.predecessors.forEach((predecessorId) => {
      graph.setEdge(predecessorId, task.id);
    });
  });

  dagre.layout(graph);

  const nodes = tasks.map((task) => {
    const position = graph.node(task.id);

    return {
      id: task.id,
      type: "eventNode",
      position: {
        x: position.x - NODE_WIDTH / 2,
        y: position.y - NODE_HEIGHT / 2,
      },
      data: task,
    };
  });

  const taskMap = new Map(tasks.map((task) => [task.id, task]));

  const edges = tasks.flatMap((task) =>
    task.predecessors.map((predecessorId) => {
      const predecessor = taskMap.get(predecessorId);

      const isCritical =
        predecessor.isCritical && task.isCritical && predecessor.EF === task.ES;

      return {
        id: `${predecessorId}-${task.id}`,
        source: predecessorId,
        target: task.id,
        type: "smoothstep",
        animated: isCritical,
        style: {
          stroke: isCritical ? "#ef4444" : "#111827",
          strokeWidth: isCritical ? 3 : 2,
        },
        markerEnd: {
          type: "arrowclosed",
          color: isCritical ? "#ef4444" : "#111827",
        },
      };
    }),
  );

  return { nodes, edges };
}
