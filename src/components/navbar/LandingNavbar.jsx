import { useState } from "react";
import { Link } from "react-router-dom";

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu visibility

  const navLinks = [
    {
      path: "/user/contactus",
      value: "CONTACT US",
    },
    {
      path: "/user/aboutus",
      value: "ABOUT US",
    },
    {
      path: "/",
      value: "HOME",
    },
    {
      path: "/user/signin",
      value: "USER",
    },
    {
      path: "/dealer/signin",
      value: "DEALER",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-red-400 justify-between items-center p-4 text-white shadow-lg">
      <h1 className="text-3xl font-bold">RENTRY CARS</h1>
      
      {/* Mobile Menu Button */}
      <button
        className="block md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Navigation Links */}
      <ul
        className={`flex-col md:flex-row md:flex md:gap-x-5 md:flex md:items-center ${isOpen ? "flex" : "hidden"} md:flex`}
      >
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link to={link.path}>
              <button className="px-4 py-2 text-lg font-semibold bg-red-500 rounded-lg transition-colors duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50">
                {link.value}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LandingNavbar;





{/*import { Link } from "react-router-dom";

const LandingNavbar = () => {
  const navLinks = [
    {
      path: "/user/contactus",
      value: "CONTACT US",
    },
    {
      path: "/user/aboutus",
      value: "ABOUT US",
    },
    {
      path: "/",
      value: "HOME",
    },
    {
      path: "/user/signin",
      value: "USER",
    },
    {
      path: "/dealer/signin",
      value: "DEALER",
    },
  ];

  return (
    <div className="flex bg-red-400 justify-between items-center p-4 text-white shadow-lg">
      <h1 className="text-3xl font-bold">RENTRY CARS</h1>
      <ul className="flex gap-x-5">
        {navLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            <li>
              <button className="px-4 py-2 text-lg font-semibold bg-red-500 rounded-lg transition-colors duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50">
                {link.value}
              </button>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default LandingNavbar;*/}
