
import { Outlet } from "react-router-dom";
import UserNavbar from "../navbar/UserNavbar";
import FooterPages from '../../pages/FooterPages'

const UserLayout = () => {
  return (
    <>
      <nav>
        <UserNavbar />
      </nav>
      <Outlet />
      <FooterPages/>
    </>
  );
};

export default UserLayout;