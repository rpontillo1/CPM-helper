import { fireEvent, render, screen } from "@testing-library/react";

import HomePage from "./HomePage";

jest.mock("../components/NetworkDiagram", () => () => (
  <div data-testid="network-diagram">Network graph</div>
));

describe("HomePage", () => {
  it("shows results on demand and hides them when tasks are cleared", () => {
    render(<HomePage />);

    const graphButton = screen.getByRole("button", {
      name: "Create Network Graph",
    });
    const criticalPathButton = screen.getByRole("button", {
      name: "Find Critical Path",
    });

    expect(graphButton).toBeDisabled();
    expect(criticalPathButton).toBeDisabled();
    expect(screen.queryByText("Network Diagram")).not.toBeInTheDocument();
    expect(screen.queryByText("Critical Path")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Load Sample Data" }));
    fireEvent.click(graphButton);
    fireEvent.click(criticalPathButton);

    expect(screen.getByText("Network Diagram")).toBeInTheDocument();
    expect(screen.getByTestId("network-diagram")).toBeInTheDocument();
    expect(screen.getByText("Critical Path")).toBeInTheDocument();
    expect(screen.getByText("Total Tasks")).toBeInTheDocument();
    expect(screen.getByText("Project Time")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear All" }));

    expect(screen.queryByText("Network Diagram")).not.toBeInTheDocument();
    expect(screen.queryByText("Critical Path")).not.toBeInTheDocument();
    expect(graphButton).toBeDisabled();
    expect(criticalPathButton).toBeDisabled();
  });
});
