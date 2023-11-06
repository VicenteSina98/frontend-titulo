import useQuoter from "../../../hooks/useQuoter";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const { showSidebar } = useQuoter();
  return (
    <aside
      id="logo-sidebar"
      className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-neutral-200 bg-white ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } pt-20 transition-transform dark:bg-neutral-800 dark:border-neutral-600 lg:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto px-3 pb-4">
        <ul className="space-y-2 font-medium">
          <SidebarItem pathTo="/home" content="Chat" />
          <SidebarItem pathTo="/home/history" content="Historial" />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
