import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const LayoutMain = () => (
  <div className="flex h-screen w-screen bg-slate-50 dark:bg-neutral-800">
    <Sidebar />
    <Outlet />
  </div>
);

export default LayoutMain;
