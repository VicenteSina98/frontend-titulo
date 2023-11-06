import { Outlet } from "react-router-dom";

export const LayoutInitSession = () => {
  const classes = [
    "h-screen",
    "w-screen",
    "p-0",
    "bg-slate-200",
    "dark:bg-neutral-900",
    "sm:px-16 sm:py-8 md:px-20 md:py-10 lg:px-24 lg:py-12 xl:px-28 xl:py-14",
  ].join(" ");
  return (
    <main className={classes}>
      <Outlet />
    </main>
  );
};

export default LayoutInitSession;
