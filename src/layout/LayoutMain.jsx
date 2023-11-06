import { Outlet } from "react-router-dom";
import Navbar from "../components/mainLayout/navbar/Navbar";
import Sidebar from "../components/mainLayout/sidebar/Sidebar";
import Main from "../components/mainLayout/Main";

export const LayoutMain = () => (
  <>
    <Navbar />
    <Sidebar />
    <Main>
      <Outlet />
    </Main>
  </>
);

export default LayoutMain;
