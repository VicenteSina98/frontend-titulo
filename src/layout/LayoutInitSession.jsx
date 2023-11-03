import { Outlet } from "react-router-dom";

const LayoutInitSession = () => (
  <main className="h-screen w-screen bg-slate-200 p-0 dark:bg-neutral-900 sm:px-16 sm:py-8 md:px-20 md:py-10 lg:px-24 lg:py-12 xl:px-28 xl:py-14">
    <Outlet />
  </main>
);

export default LayoutInitSession;
