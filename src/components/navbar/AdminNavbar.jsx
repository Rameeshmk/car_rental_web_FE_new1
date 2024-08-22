import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const navLinks = [
    {
      path: "/admin/dealers",
      value: "Dealers",
    },
    {
      path: "/admin/cars",
      value: "Cars",
    },
  ];

  return (
    <div className="flex items-center justify-between p-4 shadow-lg">
      <Link to="/admin/dashboard">
        <h1 className="text-2xl text-blue-600">RENTRY CARS</h1>
      </Link>
      <ul className="flex items-center gap-x-5">
        {navLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            <li className="text-lg font-semibold text-gray-800">
              {link.value}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default AdminNavbar;