import useQuoter from "../hooks/useQuoter";

const Sidebar = () => {
  const { name, isDark, showSidebar, setShowSidebar } = useQuoter();
  return (
    <>
      {showSidebar ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-circle-x fixed left-4 top-4 z-50 duration-300 ease-in-out  hover:cursor-pointer"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#FFF"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M10 10l4 4m0 -4l-4 4" />
        </svg>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed left-8 top-8 z-50 flex items-center duration-300 ease-in-out  hover:cursor-pointer"
          fill={isDark ? "#fff" : "#0a0a0a"}
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-64 bg-cyan-700 px-4 pt-24  duration-300 ease-in-out dark:bg-cyan-900 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="tran text-xl font-bold text-white">{name}</h2>
      </aside>
    </>
  );
};

export default Sidebar;
