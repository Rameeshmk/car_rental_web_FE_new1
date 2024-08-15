import { Outlet } from "react-router-dom";
import AdminNavbar from "../navbar/AdminNavbar";
import FooterPages from "../../pages/FooterPages";

const AdminLayout = () => {
  return (
    <div>
      <nav>
        <AdminNavbar />
      </nav>
      <Outlet />
      <FooterPages/>
    </div>
  );
};

export default AdminLayout;