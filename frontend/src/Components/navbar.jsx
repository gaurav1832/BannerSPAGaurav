import React from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar flex w-full bg-gray-200 justify-around items-center">
      <Link
        to="/"
        className="text-4xl font-bold cursor-pointer"
        style={{ color: "#E11D48" }}
      >
        TUF
      </Link>
      <div className="flex py-6">
        <div className="flex space-x-6 text-gray-800 font-semibold items-center">
          <Link
            to="https://takeuforward.org/"
            className="p-3 text-white rounded-full"
            style={{ background: "#E11D48" }}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
