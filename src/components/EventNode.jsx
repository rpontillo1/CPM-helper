export default function EventNode({ event }) {
  return (
    <div className="grid h-32 w-32 grid-cols-3 grid-rows-3 border-2 border-black">
      {/* TOP */}
      <div className="flex items-center justify-center border-r-2 border-b-2 border-black">
        {event.ES}
      </div>

      <div className="flex items-center justify-center border-r-2 border-b-2 border-black">
        {event.duration}
      </div>

      <div className="flex items-center justify-center border-b-2 border-black">
        {event.EF}
      </div>

      {/* MIDDLE */}
      <div className="col-span-3 flex items-center justify-center border-b-2 border-black font-bold text-red-500">
        {event.name}
      </div>

      {/* BOTTOM */}
      <div className="flex items-center justify-center border-r-2 border-black">
        {event.LS}
      </div>

      <div className="border-r-2 border-black"></div>

      <div className="flex items-center justify-center">{event.LF}</div>
    </div>
  );
}
