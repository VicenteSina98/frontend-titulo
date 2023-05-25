import { Outlet } from "react-router-dom";

const LayoutInitSession = () => (
  <div className="h-screen w-screen bg-slate-200 p-8 dark:bg-neutral-900">
    <Outlet />
  </div>
);

export default LayoutInitSession;
