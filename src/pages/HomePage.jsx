//import EventNode from "../components/EventNode";
import TaskTable from "../components/TaskTable";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-full justify-center items-start m-8">
      <TaskTable />
    </div>
  );
}
