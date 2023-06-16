import useQuoter from "../../hooks/useQuoter";
import axios from "axios";
import { useEffect } from "react";

const ChatForm = () => {
  const {
    answer,
    setAnswer,
    answers,
    setAnswers,
    setPrediction,
    transformToText,
    data,
    URL,
    setFinish,
    finish,
    setOk,
    ok,
    setContrario,
    contrario,
  } = useQuoter();
  const handleChange = (event) => setAnswer(event.target.value);
  const onEnterPress = (event) => {
    if (event.key === "Enter" && event.shiftKey == false) {
      event.preventDefault();
      if (answer === "") return;
      setAnswers([...answers, answer]);
    }
  };
  const queryAPI = async () => {
    await axios
      .post(URL, data)
      .then((response) => setPrediction(transformToText(response.data)));
  };
  useEffect(() => {
    if (answers.length === 19) {
      setFinish(true);
    }
  }, [answers]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (answer === "") return;
    setAnswers([...answers, answer]);
  };
  const handleClick = async () => {
    await queryAPI();
    setFinish(false);
    setContrario(false);
  };
  useEffect(() => {
    if (!contrario) setOk(true);
  }, [contrario]);
  return (
    <>
      {finish ? (
        <input
          className="text-md w-full rounded-sm bg-cyan-700 py-4 text-lg font-bold text-white hover:cursor-pointer dark:bg-cyan-800 md:w-auto md:px-16"
          type="submit"
          value="Obtener predicción"
          onClick={() => handleClick()}
        />
      ) : null}
      {ok ? (
        <input
          className="text-md w-full rounded-sm bg-cyan-700 py-4 text-lg font-bold text-white hover:cursor-pointer dark:bg-cyan-800 md:w-auto md:px-16"
          type="submit"
          value="Ver resultado"
          onClick={() => setOk(false)}
        />
      ) : (
        <form
          className="flex flex-col items-center justify-center gap-8"
          onSubmit={handleSubmit}
        >
          <textarea
            className="h-36 w-full resize-none rounded-md border-2 border-cyan-800 p-2 shadow-md focus:border-cyan-600 focus:outline-none dark:border-cyan-700 dark:bg-neutral-600 dark:text-white md:w-3/4"
            name="answer"
            id="answer"
            placeholder="Escriba su respuesta..."
            onChange={handleChange}
            value={answer}
            onKeyDown={onEnterPress}
          ></textarea>
          <input
            className="text-md w-full rounded-sm bg-cyan-700 py-4 text-lg font-bold text-white hover:cursor-pointer dark:bg-cyan-800 md:w-auto md:px-16"
            type="submit"
            value="Enviar respuesta"
          />
        </form>
      )}
    </>
  );
};

export default ChatForm;
