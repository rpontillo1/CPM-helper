import { fireEvent, render, screen } from "@testing-library/react";

import TaskTable from "./TaskTable";

describe("TaskTable", () => {
  it("shows only the add-task row when no tasks are provided", () => {
    render(<TaskTable />);

    expect(
      screen.queryByText("No tasks have been added."),
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText("Task ID")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add task" })).toBeInTheDocument();
  });

  it("renders provided tasks", () => {
    render(
      <TaskTable
        tasks={[{ id: "A", duration: 4, predecessors: [] }]}
        onRemoveTask={() => {}}
      />,
    );

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("adds a task from the editable bottom row", () => {
    const onAddTask = jest.fn();

    render(<TaskTable tasks={[]} onAddTask={onAddTask} />);

    fireEvent.change(screen.getByLabelText("Task ID"), {
      target: { value: "a" },
    });
    fireEvent.change(screen.getByLabelText("Task duration"), {
      target: { value: "4" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add task" }));

    expect(onAddTask).toHaveBeenCalledWith({
      id: "A",
      duration: 4,
      predecessors: [],
    });
  });
});
