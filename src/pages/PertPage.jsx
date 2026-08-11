import { useMemo, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import TaskTable from "../components/TaskTable";
import NetworkDiagram from "../components/NetworkDiagram";

import { calculateCriticalPath } from "../utils/calculateCriticalPath";
import { sampleTasks } from "../data/sampleData";

export default function PertPage() {
  const [tasks, setTasks] = useState([]);
  const [actionError, setActionError] = useState("");
  const [tasksExpanded, setTasksExpanded] = useState(true);

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

  const addTask = (newTask) => {
    setTasks((currentTasks) => [...currentTasks, newTask]);
    setActionError("");
  };

  const removeTask = (taskId) => {
    const dependentTasks = tasks.filter((task) =>
      task.predecessors.includes(taskId),
    );

    if (dependentTasks.length > 0) {
      const dependentIds = dependentTasks.map((task) => task.id).join(", ");

      setActionError(
        `Task ${taskId} cannot be removed because it is a predecessor of ${dependentIds}.`,
      );

      return;
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );

    setActionError("");
  };

  const clearTasks = () => {
    setTasks([]);
    setActionError("");
  };

  const loadSampleTasks = () => {
    setTasks(sampleTasks.map((task) => ({ ...task })));
    setActionError("");
    setTasksExpanded(true);
  };

  const criticalPath =
    calculationResult.criticalTasks.length > 0
      ? calculationResult.criticalTasks.map((task) => task.id).join(" → ")
      : "No critical path available";

  const displayedError = actionError || calculationResult.error;

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

      {displayedError && (
        <div className="rounded border border-red-500 bg-red-100 p-3 text-center text-red-700">
          {displayedError}
        </div>
      )}

      <section className="rounded border border-black bg-white p-4">
        <div
          className={`flex items-center justify-between ${tasksExpanded ? "mb-4" : ""}`}
        >
          <button
            type="button"
            className="flex items-center gap-2 text-left"
            aria-expanded={tasksExpanded}
            aria-controls="tasks-table"
            onClick={() => setTasksExpanded((isExpanded) => !isExpanded)}
          >
            <span aria-hidden="true">
              {tasksExpanded ? (
                <FontAwesomeIcon icon={faCaretUp} />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} />
              )}
            </span>
            <h2>Tasks</h2>
          </button>

          <div className="flex gap-2">
            {tasks.length === 0 && (
              <button
                type="button"
                className="rounded border border-black bg-blue-200 px-3 py-1 hover:bg-blue-300"
                onClick={loadSampleTasks}
              >
                Load Sample Data
              </button>
            )}

            {tasks.length > 0 && (
              <button
                type="button"
                className="rounded border border-black bg-red-200 px-3 py-1 hover:bg-red-300"
                onClick={clearTasks}
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {tasksExpanded && (
          <div id="tasks-table">
            <TaskTable
              tasks={tasks}
              onAddTask={addTask}
              onRemoveTask={removeTask}
            />
          </div>
        )}
      </section>

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
