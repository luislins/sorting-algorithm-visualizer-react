import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="flex items-center bg-purple-navbar px-6 py-4 w-full shadow-md">
        <Link
          to="/"
          className="text-xl text-white font-bold tracking-tight transition-colors hover:text-purple-haze"
        >
          Sorting Visualizer
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
