import { useState } from "react";

const emptyTask = {
  id: "",

  duration: "",
  predecessors: "",
};

export default function TaskForm({ tasks, onAddTask }) {
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

    onAddTask({
      id,

      duration,
      predecessors,
    });

    setFormData(emptyTask);
  };

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
      <h2 className="">Add Task</h2>

      <div className="flex w-full flex-row justify-between gap-2">
        <div className="flex flex-col">
          <label htmlFor="task-id">ID</label>
          <input
            id="task-id"
            className="rounded border border-black px-2"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="A"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="task-duration">Duration</label>
          <input
            id="task-duration"
            className="rounded border border-black px-2"
            name="duration"
            type="number"
            min="1"
            value={formData.duration}
            onChange={handleChange}
            placeholder="30"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="task-predecessors">Predecessors</label>
          <input
            id="task-predecessors"
            className="rounded border border-black px-2"
            name="predecessors"
            value={formData.predecessors}
            onChange={handleChange}
            placeholder="A, C"
          />
        </div>

        <button
          className="h-1/2 place-self-center rounded border border-black bg-blue-200 px-2 text-base"
          type="submit"
        >
          Add Task
        </button>
      </div>

      <p className="text-center text-red-400">{error || "\u00A0"}</p>
    </form>
  );
}
