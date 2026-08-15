// Home-page heading and controls for generating CPM results.
export default function Navbar({
  hasTasks = false,
  onCreateNetworkGraph = () => {},
  onFindCriticalPath = () => {},
}) {
  return (
    <header className="flex w-full flex-col justify-between gap-4 rounded border border-black bg-white p-4 md:flex-row md:items-center">
      <div>
        <h1 className="">Critical Path Diagram Generator</h1>

        <p className="text-gray-600">
          Add tasks, durations, and predecessors to create a CPM diagram.
        </p>
      </div>

      <nav className="flex flex-wrap gap-3" aria-label="Diagram actions">
        <button
          type="button"
          className="rounded-md border border-black bg-blue-300 px-3 py-2 font-bold hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-gray-300"
          disabled={!hasTasks}
          onClick={onCreateNetworkGraph}
        >
          Create Network Graph
        </button>

        <button
          type="button"
          className="rounded-md border border-black bg-blue-300 px-3 py-2 font-bold hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-gray-300"
          disabled={!hasTasks}
          onClick={onFindCriticalPath}
        >
          Find Critical Path
        </button>
      </nav>
    </header>
  );
}
