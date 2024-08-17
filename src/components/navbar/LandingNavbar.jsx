import { Link } from "react-router-dom";

const LandingNavbar = () => {
  const navLinks = [
    
    {
      path: "/contactus",
      value: "Contactus",
    },
    
    
    {
      path: "/user/signup",
      value: "USER",
    },
  ];

  return (
    <div className="flex bg-red-400 justify-between p-4 text-white text-2xl shadow-lg ">
     
     
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

export default LandingNavbar;