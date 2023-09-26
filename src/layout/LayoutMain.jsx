import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const LayoutMain = () => (
  <div className="flex h-screen w-screen bg-white dark:bg-neutral-900">
    <Sidebar />
    <Outlet />
  </div>
);

export default LayoutMain;
