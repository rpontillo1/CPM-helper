import { useState } from "react";

const emptyTask = {
  id: "",
  name: "",
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
    const name = formData.name.trim();
    const duration = Number(formData.duration);

    const predecessors = formData.predecessors
      .split(",")
      .map((value) => value.trim().toUpperCase())
      .filter(Boolean);
    /* 
    if (!id) {
      setError("Enter a task ID.");
      return;
    }

    if (!Number.isFinite(duration) || duration <= 0) {
      setError("Set a valid duration greater than zero.");
      return;
    } */

    if (!id || !Number.isFinite(duration) || duration <= 0) {
      setError("Enter a task ID, description, and duration greater than zero.");
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
      name,
      duration,
      predecessors,
    });

    setFormData(emptyTask);
  };

  return (
    <>
      <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit}>
        <h2>Add Task</h2>
        <div className="flex flex-row w-full gap-2 justify-between">
          <div className="flex flex-col">
            <label>ID</label>
            <input
              className="border border-black rounded px-2"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="A"
            />
          </div>

          <div className="flex flex-col ">
            <label>Description</label>
            <input
              className="border border-black rounded px-2"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Buy mozzarella cheese"
            />
          </div>

          <div className="flex flex-col">
            <label>Duration</label>
            <input
              className="border border-black rounded px-2"
              name="duration"
              type="number"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              placeholder="30"
            />
          </div>

          <div className="flex flex-col">
            <label>Predecessors</label>
            <input
              className="border border-black rounded px-2"
              name="predecessors"
              value={formData.predecessors}
              onChange={handleChange}
              placeholder="A, C"
            />
          </div>
          <button
            className="border border-black px-2 h-1/2 place-self-center rounded bg-blue-200 text-base"
            type="submit"
          >
            Add Task
          </button>
        </div>

        <p className="form-error text-center text-red-400">
          {error || "\u00A0"}
        </p>
      </form>
    </>
  );
}
