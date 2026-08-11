import { NavLink } from "react-router-dom";

const links = [""];

export default function Navbar() {
  return (
    <div className="flex flex-row w-full h-12">
      <NavLink to="/">Home</NavLink>
    </div>
  );
}
