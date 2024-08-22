import { Link } from "react-router-dom";
import SignOutButton from "../SignOutButton/SignOutButton";
const Navbar = () => {
  const navLinks = [
    {
      path: "/dealer/signup",
      value: "DEALER",
    },
    
  ];

  return (
    <div className="flex bg-red-400 justify-between p-4 text-white shadow-lg">
      <h1 className="text-3xl font-bold">RENTRY CARS</h1>
      <ul className="flex items-center gap-x-5">
        {navLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            <li>
              <button className="px-4 py-2 text-lg font-semibold bg-red-500 rounded-lg transition-colors duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50">
                {link.value}
              </button>
            </li>
          </Link>
        ))}
         <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
