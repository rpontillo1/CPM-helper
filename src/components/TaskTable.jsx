export default function TaskTable() {
  return (
    <>
      <div>
        <table className="w-full table-fixed text-left">
          <thead>
            <th className="bg-blue-100 border text-left px-8 py-4">Name</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Duration</th>
            <th className="bg-blue-100 border text-left px-8 py-4">
              Predecessors
            </th>
          </thead>
          <tr></tr>
        </table>
      </div>
    </>
  );
}
