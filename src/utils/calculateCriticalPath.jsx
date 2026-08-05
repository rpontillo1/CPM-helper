export function calculateCriticalPath(tasks) {
  const taskMap = new Map();

  tasks.forEach((task) => {
    taskMap.set(task.id, {
      ...task,
      duration: Number(task.duration),
      predecessors: task.predecessors || [],
      successors: [],
      ES: 0,
      EF: 0,
      LS: 0,
      LF: 0,
      slack: 0,
      isCritical: false,
    });
  });

  // Validate predecessor IDs and create successor lists
  taskMap.forEach((task) => {
    task.predecessors.forEach((predecessorId) => {
      const predecessor = taskMap.get(predecessorId);

      if (!predecessor) {
        throw new Error(
          `Task ${task.id} references missing predecessor ${predecessorId}.`,
        );
      }

      predecessor.successors.push(task.id);
    });
  });

  // Topological sort
  const indegree = new Map();
  const queue = [];
  const order = [];

  taskMap.forEach((task) => {
    indegree.set(task.id, task.predecessors.length);

    if (task.predecessors.length === 0) {
      queue.push(task.id);
    }
  });

  while (queue.length > 0) {
    const currentId = queue.shift();
    order.push(currentId);

    const currentTask = taskMap.get(currentId);

    currentTask.successors.forEach((successorId) => {
      const newDegree = indegree.get(successorId) - 1;
      indegree.set(successorId, newDegree);

      if (newDegree === 0) {
        queue.push(successorId);
      }
    });
  }

  if (order.length !== tasks.length) {
    throw new Error(
      "The task network contains a cycle. A task cannot eventually depend on itself.",
    );
  }

  // Forward pass: ES and EF
  order.forEach((taskId) => {
    const task = taskMap.get(taskId);

    task.ES =
      task.predecessors.length === 0
        ? 0
        : Math.max(
            ...task.predecessors.map(
              (predecessorId) => taskMap.get(predecessorId).EF,
            ),
          );

    task.EF = task.ES + task.duration;
  });

  const projectDuration = Math.max(
    ...Array.from(taskMap.values()).map((task) => task.EF),
  );

  // Backward pass: LF and LS
  [...order].reverse().forEach((taskId) => {
    const task = taskMap.get(taskId);

    task.LF =
      task.successors.length === 0
        ? projectDuration
        : Math.min(
            ...task.successors.map(
              (successorId) => taskMap.get(successorId).LS,
            ),
          );

    task.LS = task.LF - task.duration;
    task.slack = task.LS - task.ES;
    task.isCritical = task.slack === 0;
  });

  const calculatedTasks = order.map((taskId) => taskMap.get(taskId));

  return {
    tasks: calculatedTasks,
    projectDuration,
    criticalTasks: calculatedTasks.filter((task) => task.isCritical),
  };
}
