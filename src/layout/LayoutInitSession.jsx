import { Outlet } from "react-router-dom";

export const LayoutInitSession = () => {
  const classes = [
    "h-screen",
    "w-screen",
    "p-0",
    "bg-slate-200",
    "dark:bg-neutral-900",
    "sm:px-16 sm:py-8",
    "relative",
  ].join(" ");
  return (
    <main className={classes}>
      <Outlet />
    </main>
  );
};

export default LayoutInitSession;
