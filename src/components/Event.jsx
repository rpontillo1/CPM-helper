import { Handle, Position } from "@xyflow/react";

export default function EventNode({ data }) {
  return (
    <div
      className={`relative grid h-32 w-32 grid-cols-3 grid-rows-3 border-2 bg-white ${
        data.isCritical ? "border-red-500" : "border-black"
      }`}
    >
      <Handle type="target" position={Position.Left} className="event-handle" />

      <div className="flex items-center justify-center border-r-2 border-b-2 border-black">
        {data.ES}
      </div>

      <div className="flex items-center justify-center border-r-2 border-b-2 border-black">
        {data.duration}
      </div>

      <div className="flex items-center justify-center border-b-2 border-black">
        {data.EF}
      </div>

      <div
        className={`col-span-3 flex items-center justify-center border-b-2 border-black px-1 text-center font-bold ${
          data.isCritical ? "text-red-500" : "text-black"
        }`}
      >
        {data.id}
      </div>

      <div className="flex items-center justify-center border-r-2 border-black">
        {data.LS}
      </div>

      <div className="flex items-center justify-center border-r-2 border-black">
        {data.slack}
      </div>

      <div className="flex items-center justify-center">{data.LF}</div>

      <Handle
        type="source"
        position={Position.Right}
        className="event-handle"
      />
    </div>
  );
}
