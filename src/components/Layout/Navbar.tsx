import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavLink to={"/"}>
          <div className="text-white text-2xl font-[workSans] font-bold">DustConverter</div>
        </NavLink>
      </div>
    </nav>
  );
};
