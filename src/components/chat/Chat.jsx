import Welcome from "./Welcome";
import Error from "../Error";
import Spinner from "../Spinner";
import Message from "./Message";
import useQuoter from "../../hooks/useQuoter";
import { useEffect, useRef } from "react";
import axios from "axios";
import Prediction from "./Prediction";

const Chat = () => {
  // states
  const {
    chatStarted,
    setChatStarted,
    finish,
    setFinish,
    URL,
    informacionPersonal,
    spinner,
    setSpinner,
    answers,
    setAnswers,
    error,
    setError,
    errorMessage,
    setErrorMessage,
    prediction,
    setPrediction,
    ok,
    setOk,
    setAnswer,
    questions,
    setQuestions,
    questionsArray,
    optionsArray,
    checked,
    setChecked,
  } = useQuoter();

  // ref
  const scrollRef = useRef(null);

  // consult API
  const queryAPI = async () => {
    setSpinner(true);
    const data = {
      informacion_personal: informacionPersonal,
      alergias_medicamentos: answers[0],
      alergias_alimentos: answers[1],
      sintomas: answers[2],
      problemas_sentidos: answers[3],
      inflamacion: answers[4],
      manchas: answers[5],
      comezon: answers[6],
      dolor: answers[7],
      tiempo_sintomas: answers[8],
      frecuencia_sintomas: answers[9],
      consumo_medicamentos: answers[10],
      contacto_enfermo: {
        ha_tenido_contacto: answers[11],
        diagnostico: answers[12],
        sintomas_relacionados: answers[13],
      },
      contacto_toxico: {
        ha_tenido_contacto: answers[14],
        tipo: answers[15],
      },
      viaje_extranjero: {
        ha_viajado: answers[16],
        paises: answers[17],
      },
      estado_animo: answers[18],
    };
    await axios
      .post(URL, data)
      .catch((er) => {
        if (er.response.status !== 200) {
          setError(true);
          setErrorMessage(
            "Ha ocurrido un error de servidor. Por favor inténtelo más tarde"
          );
        }
      })
      .then((response) => {
        if (response !== undefined) setPrediction(response.data);
      });
    setSpinner(false);
    setFinish(true);
    setOk(true);
  };

  const handleClick = async () => {
    await queryAPI();
  };

  // save answers
  const handleSubmit = (event) => {
    event.preventDefault();
    if (checked.checked.length === 0) return;
    // save data
    let saveAnswer = checked.checked.join(", ");
    setChecked({ index: checked.index + 1, checked: [] });
    setAnswers([...answers, saveAnswer]);
  };

  // reset states
  const newPrediction = () => {
    setFinish(false);
    setOk(false);
    setQuestions([questionsArray[0]]);
    setAnswers([]);
    setAnswer("");
    setPrediction({});
    setChecked({ index: 0, checked: [] });
    setError(false);
  };

  // save the option selected
  const handleCheck = (event) => {
    let updatedList = [...checked.checked];
    if (event.target.checked) {
      updatedList = [...checked.checked, event.target.value];
    } else {
      updatedList.splice(checked.checked.indexOf(event.target.value), 1);
    }
    setChecked({ ...checked, checked: updatedList });
  };

  // finish chat
  useEffect(() => {
    if (answers.length === 19) setFinish(true);
  }, [answers]);

  // save questions
  useEffect(() => {
    if (
      answers.length > 0 &&
      !questions.includes(questionsArray[questions.length])
    ) {
      setAnswer("");
      if (questionsArray[questions.length] !== undefined)
        setQuestions([...questions, questionsArray[questions.length]]);
    }
  }, [answers]);

  // scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  return (
    <main className="mx-auto mb-8 mt-20 flex w-2/3 flex-col justify-end gap-8">
      {/* mensajes del chat */}
      <section ref={scrollRef} className="flex flex-col gap-4 overflow-y-auto">
        <div className={chatStarted ? "hidden" : ""}>
          <Welcome />
        </div>
        <div className={!chatStarted ? "hidden" : ""}>
          {/* mensaje de error en caso de que la API muera */}
          <div className={!error ? "hidden" : ""}>
            <Error message={errorMessage} />
          </div>
          {/* chat */}
          <div className={error ? "hidden" : ""}>
            {!spinner ? (
              questions.map((question, index) => (
                <div key={index}>
                  <Message data={question} isIA={true} />
                  <div className={index >= answers.length ? "hidden" : ""}>
                    <Message data={answers[index]} isIA={false} />
                  </div>
                </div>
              ))
            ) : (
              <Spinner />
            )}
            {/* resultado */}
            <div
              className={Object.keys(prediction).length === 0 ? "hidden" : ""}
            >
              <Prediction data={prediction} />
            </div>
          </div>
        </div>
      </section>
      {/* Inputs */}
      <section className="flex flex-col gap-4">
        <button
          className={`text-md w-full rounded-sm bg-cyan-700 py-4 text-lg font-bold text-white hover:cursor-pointer dark:bg-cyan-800 md:mx-auto md:w-96 md:px-16 ${
            chatStarted ? "hidden" : ""
          }`}
          onClick={() => setChatStarted(!chatStarted)}
        >
          Comenzar predicción
        </button>
        <div className={!chatStarted ? "hidden" : ""}>
          <div
            className={`flex flex-col items-center justify-center ${
              !finish ? "hidden" : ""
            }`}
          >
            {/* obtener prediccion */}
            <input
              className={`text-md w-full rounded-sm bg-cyan-700 py-4 text-lg font-bold text-white hover:cursor-pointer dark:bg-cyan-800 md:w-auto md:px-16 ${
                ok || spinner ? "hidden" : ""
              }`}
              type="submit"
              value="Obtener predicción"
              onClick={() => handleClick()}
            />
            {/* nueva prediccion */}
            <input
              className={`text-md w-full rounded-sm bg-cyan-700 py-4 text-lg font-bold text-white hover:cursor-pointer dark:bg-cyan-800 md:w-auto md:px-16 ${
                !ok || spinner ? "hidden" : ""
              }`}
              type="submit"
              value="Nueva predicción"
              onClick={() => newPrediction()}
            />
            <p
              className={`text-center text-3xl font-bold dark:text-white ${
                !spinner ? "hidden" : ""
              }`}
            >
              Generando la predicción...
            </p>
          </div>
          <div className={finish ? "hidden" : ""}>
            <form
              className={`flex flex-col items-center justify-center gap-8 ${
                ok ? "hidden" : ""
              }`}
              onSubmit={handleSubmit}
            >
              <div
                className={`grid grid-cols-2 ${
                  optionsArray[checked.index] % 2 === 0
                    ? "md:grid-cols-2"
                    : "md:grid-cols-3"
                } md:text-md gap-4 text-xs sm:text-sm lg:text-lg`}
              >
                {optionsArray[checked.index]?.map((option, index) => (
                  <div className={`flex gap-2 overflow-clip `} key={index}>
                    <input
                      type="checkbox"
                      name={`option-${index}`}
                      id={`option-${index}`}
                      onChange={handleCheck}
                      value={option}
                      className="absolute h-8 w-8 opacity-0"
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className={`rounded-lg px-2 py-2 hover:cursor-pointer ${
                        checked.checked.includes(option)
                          ? "bg-cyan-700 font-bold text-white shadow-md"
                          : "border-2 border-neutral-400 bg-transparent text-neutral-300"
                      }`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              <input
                className={`text-md w-full rounded-sm bg-cyan-700 py-4 text-lg font-bold text-white dark:bg-cyan-800 md:w-auto md:px-16 ${
                  checked.checked.length === 0
                    ? "hover:cursor-not-allowed"
                    : "hover:cursor-pointer"
                }`}
                type="submit"
                value="Enviar respuesta"
              />
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Chat;
