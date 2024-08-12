import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-800 p-4 mt-12 text-center">
      <div className="flex items-center justify-center space-x-2 text-blue-100">
        Made with{" "}
        <span className="px-2" style={{ color: "#E11D48" }}>
          <FaHeart />{" "}
        </span>
        by{" "}
        <Link
          to="https://gauravgarwa.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300"
        >
          Gaurav Garwa
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
