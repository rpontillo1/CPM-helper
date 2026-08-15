import { useMemo, useState } from "react";

import TaskTable from "../components/TaskTable";
import NetworkDiagram from "../components/NetworkDiagram";
import Navbar from "../components/layout/Navbar";
import { calculateCriticalPath } from "../utils/calculateCriticalPath";

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [showNetworkGraph, setShowNetworkGraph] = useState(false);
  const [showCriticalPath, setShowCriticalPath] = useState(false);

  const calculationResult = useMemo(() => {
    if (tasks.length === 0) {
      return {
        calculatedTasks: [],
        criticalTasks: [],
        projectDuration: 0,
        error: "",
      };
    }

    try {
      const result = calculateCriticalPath(tasks);

      return {
        calculatedTasks: result.tasks,
        criticalTasks: result.criticalTasks,
        projectDuration: result.projectDuration,
        error: "",
      };
    } catch (error) {
      return {
        calculatedTasks: [],
        criticalTasks: [],
        projectDuration: 0,
        error: error.message,
      };
    }
  }, [tasks]);

  const handleTasksChange = (nextTasks) => {
    setTasks(nextTasks);

    if (nextTasks.length === 0) {
      setShowNetworkGraph(false);
      setShowCriticalPath(false);
    }
  };

  const criticalPath = calculationResult.criticalTasks
    .map((task) => task.id)
    .join(" → ");

  return (
    <main className="m-8 flex min-h-full flex-col items-start justify-center gap-6">
      <Navbar
        hasTasks={tasks.length > 0}
        onCreateNetworkGraph={() => setShowNetworkGraph(true)}
        onFindCriticalPath={() => setShowCriticalPath(true)}
      />

      <TaskTable onTasksChange={handleTasksChange} />

      {showCriticalPath && (
        <section className="w-full rounded border border-red-500 bg-red-50 p-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold">Critical Path</h2>

              {calculationResult.error ? (
                <p className="mt-2 text-red-700">{calculationResult.error}</p>
              ) : (
                <p className="mt-2 text-xl font-bold text-red-500">
                  {criticalPath || "No critical path available"}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <div className="rounded border border-black bg-white px-5 py-2 text-center">
                <p className="text-sm">Total Tasks</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>

              <div className="rounded border border-black bg-white px-5 py-2 text-center">
                <p className="text-sm">Project Time</p>
                <p className="text-2xl font-bold">
                  {calculationResult.projectDuration}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {showNetworkGraph && (
        <section className="w-full rounded border border-black bg-white p-4">
          <h2 className="mb-4">Network Diagram</h2>

          <div className="h-[650px] w-full overflow-hidden rounded border border-black">
            {calculationResult.error ? (
              <div className="flex h-full items-center justify-center p-6 text-center text-red-500">
                {calculationResult.error}
              </div>
            ) : (
              <NetworkDiagram tasks={calculationResult.calculatedTasks} />
            )}
          </div>
        </section>
      )}
    </main>
  );
}
