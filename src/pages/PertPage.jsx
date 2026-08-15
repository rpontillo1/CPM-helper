import { useMemo, useState } from "react";

import TaskTable from "../components/TaskTable";
import NetworkDiagram from "../components/NetworkDiagram";

import { calculateCriticalPath } from "../utils/calculateCriticalPath";

export default function PertPage() {
  const [tasks, setTasks] = useState([]);

  const calculationResult = useMemo(() => {
    if (tasks.length === 0) {
      return {
        calculatedTasks: [],
        projectDuration: 0,
        criticalTasks: [],
        error: "",
      };
    }

    try {
      const result = calculateCriticalPath(tasks);

      return {
        calculatedTasks: result.tasks,
        projectDuration: result.projectDuration,
        criticalTasks: result.criticalTasks,
        error: "",
      };
    } catch (error) {
      return {
        calculatedTasks: [],
        projectDuration: 0,
        criticalTasks: [],
        error: error.message,
      };
    }
  }, [tasks]);

  const criticalPath =
    calculationResult.criticalTasks.length > 0
      ? calculationResult.criticalTasks.map((task) => task.id).join(" → ")
      : "No critical path available";

  return (
    <main className="flex min-h-screen w-full flex-col gap-6 bg-gray-100 p-6">
      <header className="flex flex-col justify-between gap-4 rounded border border-black bg-white p-4 md:flex-row md:items-center">
        <div>
          <h1 className="">Critical Path Diagram Generator</h1>

          <p className="text-gray-600">
            Add tasks, durations, and predecessors to create a CPM diagram.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="rounded border border-black bg-blue-100 px-5 py-2 text-center">
            <p className="text-sm">Project Duration</p>

            <p className="text-2xl font-bold">
              {calculationResult.projectDuration}
            </p>
          </div>

          <div className="rounded border border-black bg-red-100 px-5 py-2 text-center">
            <p className="text-sm">Number of Tasks</p>

            <p className="text-2xl font-bold">{tasks.length}</p>
          </div>
        </div>
      </header>

      {calculationResult.error && (
        <div className="rounded border border-red-500 bg-red-100 p-3 text-center text-red-700">
          {calculationResult.error}
        </div>
      )}

      <TaskTable onTasksChange={setTasks} />

      <section className="rounded border border-red-500 bg-red-50 p-4">
        <h2 className="text-xl font-bold">Critical Path</h2>

        <p className="mt-2 text-xl font-bold text-red-500">{criticalPath}</p>
      </section>

      <section className="rounded border border-black bg-white p-4">
        <h2 className="mb-4">Network Diagram</h2>

        <div className="h-[650px] w-full overflow-hidden rounded border border-black">
          {tasks.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-500">
              Add at least one task to generate the diagram.
            </div>
          ) : calculationResult.error ? (
            <div className="flex h-full items-center justify-center p-6 text-center text-red-500">
              {calculationResult.error}
            </div>
          ) : (
            <NetworkDiagram tasks={calculationResult.calculatedTasks} />
          )}
        </div>
      </section>
    </main>
  );
}
