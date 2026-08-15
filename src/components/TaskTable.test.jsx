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
        initialTasks={[{ id: "A", duration: 4, predecessors: [] }]}
      />,
    );

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("collapses and expands the entire task table", () => {
    render(<TaskTable />);

    const toggle = screen.getByRole("button", { name: "Tasks" });

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByLabelText("Task ID")).not.toBeInTheDocument();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByLabelText("Task ID")).toBeInTheDocument();
  });

  it("loads sample data and clears it without parent actions", () => {
    const onTasksChange = jest.fn();
    render(<TaskTable onTasksChange={onTasksChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Load Sample Data" }));
    expect(screen.getByText("L")).toBeInTheDocument();
    expect(onTasksChange).toHaveBeenLastCalledWith(
      expect.arrayContaining([expect.objectContaining({ id: "A" })]),
    );

    fireEvent.click(screen.getByRole("button", { name: "Clear All" }));
    expect(screen.queryByText("L")).not.toBeInTheDocument();
    expect(onTasksChange).toHaveBeenLastCalledWith([]);
  });

  it("adds a task from the editable bottom row", () => {
    const onTasksChange = jest.fn();

    render(<TaskTable onTasksChange={onTasksChange} />);

    fireEvent.change(screen.getByLabelText("Task ID"), {
      target: { value: "a" },
    });
    fireEvent.change(screen.getByLabelText("Task duration"), {
      target: { value: "4" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add task" }));

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(onTasksChange).toHaveBeenLastCalledWith([
      { id: "A", duration: 4, predecessors: [] },
    ]);
  });

  it("prevents removing a task that another task depends on", () => {
    render(
      <TaskTable
        initialTasks={[
          { id: "A", duration: 4, predecessors: [] },
          { id: "B", duration: 2, predecessors: ["A"] },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Remove task A" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Task A cannot be removed because it is a predecessor of B.",
    );
    expect(screen.getAllByText("A")).toHaveLength(2);
  });
});
