import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TaskTable({ tasks, onRemoveTask }) {
  return (
    <div className="w-3/4 overflow-x-auto place-self-center">
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
          {tasks.length === 0 ? (
            <tr>
              <td
                className="border border-black px-3 py-6 text-center text-gray-500 w-full"
                colSpan={4}
              >
                No tasks have been added.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
