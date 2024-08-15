

import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import FooterPages from '../../pages/FooterPages'

const HomeLayoutPages = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Outlet />
      <FooterPages/>
    </>
  );
};

export default HomeLayoutPages;
