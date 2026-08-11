import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const emptyTask = {
  id: "",
  duration: "",
  predecessors: "",
};

export default function TaskTable({
  tasks = [],
  onAddTask = () => {},
  onRemoveTask = () => {},
}) {
  const [formData, setFormData] = useState(emptyTask);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "id" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const id = formData.id.trim();
    const duration = Number(formData.duration);
    const predecessors = formData.predecessors
      .split(",")
      .map((value) => value.trim().toUpperCase())
      .filter(Boolean);

    if (!id || !Number.isFinite(duration) || duration <= 0) {
      setError("Enter a task ID and a duration greater than zero.");
      return;
    }

    if (tasks.some((task) => task.id === id)) {
      setError(`Task ${id} already exists.`);
      return;
    }

    const invalidPredecessor = predecessors.find(
      (predecessorId) =>
        predecessorId === id ||
        !tasks.some((task) => task.id === predecessorId),
    );

    if (invalidPredecessor) {
      setError(
        `Predecessor ${invalidPredecessor} does not exist or is invalid.`,
      );
      return;
    }

    onAddTask({ id, duration, predecessors });
    setFormData(emptyTask);
  };

  return (
    <form className="w-3/4 place-self-center" onSubmit={handleSubmit}>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse border border-black bg-white text-left">
          <thead className="bg-blue-200">
            <tr>
              <th className="w-[10%] border border-black px-3 py-2 text-center">
                ID
              </th>

              <th className="w-[15%] border border-black px-3 py-2 text-center">
                Duration
              </th>

              <th className="w-[25%] border border-black px-3 py-2 text-center">
                Predecessors
              </th>

              <th className="w-[15%] border border-black px-3 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-100">
                <td className="border border-black px-3 py-2 text-center font-bold">
                  {task.id}
                </td>

                <td className="border border-black px-3 py-2 text-center">
                  {task.duration}
                </td>

                <td className="border border-black px-3 py-2">
                  {task.predecessors?.length > 0
                    ? task.predecessors.join(", ")
                    : "None"}
                </td>

                <td className="border border-black px-3 py-2 text-center">
                  <button
                    type="button"
                    className="rounded border border-black bg-red-200 px-3 py-1 hover:bg-red-300"
                    onClick={() => onRemoveTask(task.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}

            <tr className="bg-blue-50">
              <td className="border border-black p-2">
                <input
                  aria-label="Task ID"
                  className="w-full rounded border border-gray-400 px-2 py-1 text-center font-bold"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="New ID"
                />
              </td>

              <td className="border border-black p-2">
                <input
                  aria-label="Task duration"
                  className="w-full rounded border border-gray-400 px-2 py-1 text-center"
                  name="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                />
              </td>

              <td className="border border-black p-2">
                <input
                  aria-label="Task predecessors"
                  className="w-full rounded border border-gray-400 px-2 py-1"
                  name="predecessors"
                  value={formData.predecessors}
                  onChange={handleChange}
                  placeholder="A, C (optional)"
                />
              </td>

              <td className="border border-black p-2 text-center">
                <button
                  type="submit"
                  aria-label="Add task"
                  className="rounded border border-black bg-blue-200 px-3 py-1 hover:bg-blue-300"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span className="ml-2">Add</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {error && (
        <p className="mt-2 text-center text-red-500" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
