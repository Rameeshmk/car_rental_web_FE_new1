import { Link } from "react-router-dom";

const UserNavbar = () => {
  const navLinks = [
    {
      path: "/contact-us",
      value: "CONTACT US",
    },
    {
      path: "/about-us",
      value: "ABOUT US",
    },
    {
      path: "/user/signin",
      value: "SIGNOUT",
    },
  ];
  return (
    <div className="flex bg-red-400 justify-between p-4 text-white text-2xl shadow-lg ">
      <h1>Logo</h1>
      <ul className="flex items-center gap-x-5 ">
        {navLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            <li className=" hover:bg-sky-500">{link.value}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default UserNavbar;