import { Handle, Position } from "@xyflow/react";

export default function EventNode({ data }) {
  return (
    <div
      className={`event-node ${data.isCritical ? "event-node--critical" : ""}`}
    >
      <Handle type="target" position={Position.Left} className="event-handle" />

      <div className="event-node__top">
        <span>{data.ES}</span>
        <span>{data.duration}</span>
        <span>{data.EF}</span>
      </div>

      <div className="event-node__name">
        <strong>{data.id}</strong>
        <small>{data.name}</small>
      </div>

      <div className="event-node__bottom">
        <span>{data.LS}</span>
        <span>{data.slack}</span>
        <span>{data.LF}</span>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="event-handle"
      />
    </div>
  );
}
