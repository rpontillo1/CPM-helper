import EventNode from "../components/EventNode";
import TaskTable from "../components/TaskTable";

const e = {
  name: "A",
  duration: 4,
  ES: 0,
  EF: 4,
  LS: 0,
  LF: 4,
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-full justify-center items-start m-8">
      <TaskTable />
    </div>
  );
}
