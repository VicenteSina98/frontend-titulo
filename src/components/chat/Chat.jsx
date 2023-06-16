import { useEffect } from "react";
import ChatUI from "./ChatUI";
import ChatForm from "./ChatForm";
import Welcome from "./Welcome";
import useQuoter from "../../hooks/useQuoter";

const Chat = () => {
  const {
    scrollToBottom,
    chatStarted,
    setChatStarted,
  } = useQuoter();
  // use effect
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    <main className="mx-auto mb-8 mt-20 flex w-2/3 flex-col justify-end gap-8">
      <section className="flex flex-col gap-4 overflow-y-scroll">
        {!chatStarted ? <Welcome /> : <ChatUI />}
      </section>
      <section className="flex flex-col gap-4">
        {!chatStarted ? (
          <button
            className="text-md w-full rounded-sm bg-cyan-700 py-4 text-lg font-bold text-white hover:cursor-pointer dark:bg-cyan-800 md:mx-auto md:w-96 md:px-16"
            onClick={() => setChatStarted(!chatStarted)}
          >
            Comenzar predicción
          </button>
        ) : (
          <ChatForm />
        )}
      </section>
    </main>
  );
};

export default Chat;
