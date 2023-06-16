import { useEffect } from "react";
import Chat from "../components/chat/Chat";
import Sidebar from "../components/Sidebar";
import useQuoter from "../hooks/useQuoter";

const Home = () => {
  const { setIsDark } = useQuoter();
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) =>
        setIsDark(event.matches ? true : false)
      );
  }, [setIsDark]);
  return (
    <div className="flex h-screen w-screen bg-slate-50 dark:bg-neutral-700">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Home;
