import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="flex justify-start flex-wrap bg-purple-navbar p-6 w-full">
        <div className="w-full block flex-grow">
          <div className="text-sm">
            <Link
              to="/"
              className="mt-4 text-xl text-white font-bold hover:text-purple-dark mr-4"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
