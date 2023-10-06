import Welcome from "./Welcome";
import Spinner from "../Spinner";
import Message from "./Message";
import useQuoter from "../../hooks/useQuoter";
import { useEffect, useRef, useState } from "react";
import Prediction from "./Prediction";
import useAxios from "../../hooks/useAxios";
import BlockError from "../error/BlockError";
import { OPTIONS_ARRAY, QUESTIONS_ARRAY } from "../../helpers/constants";
import { matrixToObject } from "../../helpers/functions";

const Chat = () => {
  // states
  const {
    chatStarted,
    setChatStarted,
    finish,
    setFinish,
    informacionPersonal,
    antecedentesMedicos,
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
    index,
    setIndex,
  } = useQuoter();
  // state para otros
  const [showOtros, setShowOtros] = useState(false);
  const [otros, setOtros] = useState({
    sintomas: "", // index = 0
    inflamacion: "", // index = 2
    manchas: "", // index = 3
    comezon: "", // index = 4
    dolor: "", // index = 5
    consumeMedicamentos: "", // index = 8
    diagnosticoContacto: "", // index = 10
    agenteInfeccioso: "", // index = 13
    pais: "", // index = 15
    estadoAnimo: "", // index = 16
  });
  const [typeQuestion, setTypeQuestion] = useState("sintomas");
  const [check, setCheck] = useState(matrixToObject(OPTIONS_ARRAY));
  const [countCheck, setCountCheck] = useState(0);
  const [extraAnswers, setExtraAnswers] = useState({
    10: "",
    11: "",
    13: "",
    15: "",
  });

  // ref
  const scrollRef = useRef(null);

  // hooks
  const api = useAxios();

  // handlers
  const supportHandleClick = async () => {
    let copyAnswers = [...answers];
    if (extraAnswers[10] !== "") copyAnswers.splice(10, 0, extraAnswers[10]);
    if (extraAnswers[11] !== "") copyAnswers.splice(11, 0, extraAnswers[11]);
    if (extraAnswers[13] !== "") copyAnswers.splice(13, 0, extraAnswers[13]);
    if (extraAnswers[15] !== "") copyAnswers.splice(15, 0, extraAnswers[15]);
    setAnswers(copyAnswers);
  };

  const handleClick = async () => {
    await supportHandleClick();
    await queryAPI();
    1;
  };

  const cleanOnSubmit = async (newIndex) => {
    setIndex(newIndex);
    setCountCheck(0);
    setShowOtros(false);
    setOtros({
      sintomas: "", // index = 0
      inflamacion: "", // index = 2
      manchas: "", // index = 3
      comezon: "", // index = 4
      dolor: "", // index = 5
      haceCuanto: "", // index = 6
      consumeMedicamentos: "", // index = 8
      diagnosticoContacto: "", // index = 10
      agenteInfeccioso: "", // index = 13
      pais: "", // index = 15
      estadoAnimo: "", // index = 16
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // chequear que haya al menos una opcion seleccionada
    if (countCheck === 0) return;
    // chequear que si esta seleccionado otros, el input text no este vacio
    if (showOtros && otros[typeQuestion] === "") return;
    // guardar respuestas
    let newIndex = index + 1;
    const responsesFlags = check[index];
    let answerList = [];
    for (let option in responsesFlags) {
      if (responsesFlags[option]) {
        if (option === "Otro" || option === "Otros")
          answerList.push(otros[typeQuestion]);
        else answerList.push(option);
      }
    }
    // saltar preguntas dependientes
    let auxExtraAnswers = { ...extraAnswers };
    if (index === 9 && answerList.includes("No")) {
      auxExtraAnswers[10] = "No aplica";
      newIndex += 1;
      auxExtraAnswers[11] = "No aplica";
      newIndex += 1;
    } else if (index === 12 && answerList.includes("No")) {
      auxExtraAnswers[13] = "No aplica";
      newIndex += 1;
    } else if (index === 14 && answerList.includes("No")) {
      auxExtraAnswers[15] = "No aplica";
      newIndex += 1;
    }
    const saveAnswer = answerList.join(", ");
    if (newIndex === 17) {
      let copyAnswers = [...answers, saveAnswer];
      if (extraAnswers[10] !== "") copyAnswers.splice(10, 0, extraAnswers[10]);
      if (extraAnswers[11] !== "") copyAnswers.splice(11, 0, extraAnswers[11]);
      if (extraAnswers[13] !== "") copyAnswers.splice(13, 0, extraAnswers[13]);
      if (extraAnswers[15] !== "") copyAnswers.splice(15, 0, extraAnswers[15]);
      setAnswers(copyAnswers);
      await cleanOnSubmit(newIndex);
      return;
    }
    setExtraAnswers(auxExtraAnswers);
    setAnswers([...answers, saveAnswer]);
    await cleanOnSubmit(newIndex);
  };

  const updateOtros = (value) => {
    switch (index) {
      case 0:
        setOtros({ ...otros, sintomas: value });
        setTypeQuestion("sintomas");
        break;
      case 2:
        setOtros({ ...otros, inflamacion: value });
        setTypeQuestion("inflamacion");
        break;
      case 3:
        setOtros({ ...otros, manchas: value });
        setTypeQuestion("manchas");
        break;
      case 4:
        setOtros({ ...otros, comezon: value });
        setTypeQuestion("comezon");
        break;
      case 5:
        setOtros({ ...otros, dolor: value });
        setTypeQuestion("dolor");
        break;
      case 8:
        setOtros({ ...otros, consumeMedicamentos: value });
        setTypeQuestion("consumeMedicamentos");
        break;
      case 10:
        setOtros({ ...otros, diagnosticoContacto: value });
        setTypeQuestion("diagnosticoContacto");
        break;
      case 13:
        setOtros({ ...otros, agenteInfeccioso: value });
        setTypeQuestion("agenteInfeccioso");
        break;
      case 15:
        setOtros({ ...otros, pais: value });
        setTypeQuestion("pais");
        break;
      case 16:
        setOtros({ ...otros, estadoAnimo: value });
        setTypeQuestion("estadoAnimo");
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    updateOtros(event.target.value);
  };

  const updateCheck = (option) => {
    let copyCheck = { ...check };
    copyCheck[index][option] = !check[index][option];
    setCheck(copyCheck);
  };

  const handleCheck = (event) => {
    const option = event.target.innerText;
    // chequear preguntas con respuesta unica
    if (
      (index === 6 || index === 7) &&
      countCheck === 1 &&
      !check[index][option]
    )
      return;
    // chequear seleccion de otros o ninguno cuando ya hay otras opciones seleccionadas
    if (
      (option === "Otro" || option === "Otros" || option === "Ninguno") &&
      multipleOptionsSelected() &&
      !check[index][option]
    )
      return;
    // chequear seleccion de opciones cuando otros o ninguno estan seleccionadas
    if (
      (option !== "Otro" || option !== "Otros" || option !== "Ninguno") &&
      !check[index][option]
    ) {
      if (check[index]["Otro"] || check[index]["Otros"]) return;
      if (check[index]["Otro"] || check[index]["Otros"]) return;
      if (check[index]["Ninguno"]) return;
    }
    if ((option === "Otro" || option === "Otros") && check[index][option]) {
      // deseleccionar otros
      updateCheck(option);
      updateOtros("");
      setShowOtros(false);
      setCountCheck(countCheck - 1);
    } else if (
      (option === "Otro" || option === "Otros") &&
      !check[index][option]
    ) {
      // seleccionar otros
      updateCheck(option);
      setShowOtros(true);
      setCountCheck(countCheck + 1);
    } else if (check[index][option]) {
      // deseleccionar opcion
      updateCheck(option);
      setCountCheck(countCheck - 1);
    } else {
      // seleccionar opcion
      updateCheck(option);
      setCountCheck(countCheck + 1);
    }
  };

  // consult API
  const queryAPI = async () => {
    setSpinner(true);
    const data = {
      informacion_personal: {
        informacion_personal: informacionPersonal,
        antecedentes_medicos: antecedentesMedicos,
      },
      sintomas: answers[0],
      problemas_sentidos: answers[1],
      inflamacion: answers[2],
      manchas: answers[3],
      comezon: answers[4],
      dolor: answers[5],
      tiempo_sintomas: answers[6],
      frecuencia_sintomas: answers[7],
      consumo_medicamentos: answers[8],
      contacto_enfermo: {
        ha_tenido_contacto: answers[9],
        diagnostico: answers[10],
        sintomas_relacionados: answers[11],
      },
      contacto_toxico: {
        ha_tenido_contacto: answers[12],
        tipo: answers[13],
      },
      viaje_extranjero: {
        ha_viajado: answers[14],
        paises: answers[15],
      },
      estado_animo: answers[16],
    };
    try {
      const responseGeneracion = await api.post("/prediccion/generar", data);
      console.log(responseGeneracion);
      const dataResponse = responseGeneracion.data;
      setPrediction(dataResponse.response);
      await api.post("/prediccion/guardar", {
        id: informacionPersonal.user,
        preguntas: questions,
        respuestas: answers,
        enfermedad1: dataResponse.response[0] ?? "",
        enfermedad2: dataResponse.response[1] ?? "",
        enfermedad3: dataResponse.response[2] ?? "",
        enfermedad4: dataResponse.response[3] ?? "",
        enfermedad5: dataResponse.response[4] ?? "",
      });
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage(
        "Ha ocurrido un error de servidor. Por favor inténtelo más tarde"
      );
    }
    setSpinner(false);
    setFinish(true);
    setOk(true);
  };

  const multipleOptionsSelected = () => {
    const optionsFlags = check[index];
    for (let option in optionsFlags)
      if (option !== "Otro" || option !== "Otros" || option !== "Ninguno")
        if (optionsFlags[option]) return true;
    return false;
  };

  // reset states
  const newPrediction = () => {
    setFinish(false);
    setOk(false);
    setQuestions([QUESTIONS_ARRAY[0]]);
    setTypeQuestion("sintomas");
    setAnswers([]);
    setAnswer("");
    setPrediction([]);
    setIndex(0);
    setError(false);
    setShowOtros(false);
    setOtros({
      sintomas: "", // index = 0
      inflamacion: "", // index = 2
      manchas: "", // index = 3
      comezon: "", // index = 4
      dolor: "", // index = 5
      consumeMedicamentos: "", // index = 8
      diagnosticoContacto: "", // index = 10
      agenteInfeccioso: "", // index = 13
      pais: "", // index = 15
      estadoAnimo: "", // index = 16
    });
    setCheck(matrixToObject(OPTIONS_ARRAY));
    setCountCheck(0);
  };

  // cancel prediction
  const cancelPrediction = () => {
    newPrediction();
    setChatStarted(false);
  };

  // effects
  useEffect(() => {
    if (index === 17) setFinish(true);
  }, [index]);

  useEffect(() => {
    if (answers.length > 0 && !questions.includes(QUESTIONS_ARRAY[index])) {
      setAnswer("");
      if (QUESTIONS_ARRAY[index] !== undefined)
        setQuestions([...questions, QUESTIONS_ARRAY[index]]);
    }
  }, [answers]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  return (
    <main className="mx-auto mb-8 mt-24 flex w-10/12 flex-col justify-between gap-8 sm:w-8/12 md:w-7/12">
      {/* mensajes del chat */}
      <section ref={scrollRef} className="flex flex-col gap-4 overflow-y-auto">
        <div className={chatStarted ? "hidden" : ""}>
          <Welcome />
        </div>
        <div className={!chatStarted ? "hidden" : ""}>
          {/* mensaje de error en caso de que la API muera */}
          <div className={!error ? "hidden" : ""}>
            <BlockError message={errorMessage} />
          </div>
          {/* chat */}
          <div className={`flex flex-col gap-4 ${error ? "hidden" : ""}`}>
            {!spinner ? (
              questions.map((question, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <Message data={question} isIA={true} />
                  <div className={i >= answers.length ? "hidden" : ""}>
                    <Message data={answers[i]} isIA={false} />
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
          {/* botones */}
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
            {/* cancelar prediccion */}
            <input
              className={`text-md w-full rounded-sm py-4 text-lg text-red-700 hover:cursor-pointer dark:text-red-400 md:w-auto md:px-16 ${
                ok || spinner ? "hidden" : ""
              }`}
              type="submit"
              value="Cancelar predicción"
              onClick={() => cancelPrediction()}
            />
            <p
              className={`text-center text-3xl font-bold dark:text-white ${
                !spinner ? "hidden" : ""
              }`}
            >
              Generando la predicción...
            </p>
          </div>
          {/* opciones */}
          <div className={`${finish ? "hidden" : ""}`}>
            <form
              className={`flex h-max w-full flex-col items-center justify-center gap-12 ${
                ok ? "hidden" : ""
              }`}
              onSubmit={handleSubmit}
            >
              {/* checkbox */}
              <div
                className={`grid w-full grid-cols-2 items-center justify-center gap-x-4 gap-y-4 text-center text-xs sm:grid-cols-4 sm:gap-y-8 sm:text-sm md:gap-x-6 md:gap-y-12 lg:gap-x-8 lg:gap-y-8`}
              >
                {OPTIONS_ARRAY[index]?.map((option, i) => (
                  <div
                    key={i}
                    onClick={handleCheck}
                    className={`w-full rounded-lg border-2 px-2 py-2 ${
                      check[index][option]
                        ? "border-cyan-700 bg-cyan-700 text-white shadow-md"
                        : "border-cyan-800 bg-transparent text-cyan-800 dark:border-neutral-300 dark:text-neutral-300"
                    } ${
                      ((option !== "Otro" || option !== "Otros") &&
                        (check[index]["Otro"] || check[index]["Otros"])) ||
                      (option !== "Ninguno" && check[index]["Ninguno"]) ||
                      ((option === "Otro" ||
                        option === "Otros" ||
                        option === "Ninguno") &&
                        multipleOptionsSelected() &&
                        !check[index][option]) ||
                      ((index === 6 || index === 7) &&
                        countCheck === 1 &&
                        !check[index][option])
                        ? "hover:cursor-not-allowed"
                        : "hover:cursor-pointer"
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
              {/* input text otros */}
              <input
                type="text"
                name={OPTIONS_ARRAY[index]}
                id={OPTIONS_ARRAY[index]}
                placeholder="Especifique"
                onChange={handleChange}
                value={otros[typeQuestion]}
                className={`w-full rounded-lg border-2 p-4 text-lg focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500  lg:text-lg ${
                  !showOtros ? "hidden" : ""
                }`}
              />
              <div className="flex w-7/12 flex-col-reverse items-center justify-center gap-4 sm:w-1/2 md:w-5/12">
                {/* cancelar prediccion */}
                <input
                  className={`w-full cursor-pointer rounded-sm px-2 py-4 text-center text-sm text-red-700 dark:text-red-400 sm:text-base`}
                  type="submit"
                  value="Cancelar predicción"
                  onClick={() => cancelPrediction()}
                />
                {/* submit */}
                <input
                  className={`w-full rounded-sm bg-cyan-700 py-4 text-center text-sm font-bold text-white dark:bg-cyan-800 sm:text-base ${
                    countCheck === 0 ||
                    (showOtros && otros[typeQuestion] === "")
                      ? "hover:cursor-not-allowed"
                      : "hover:cursor-pointer"
                  }`}
                  type="submit"
                  value="Siguiente"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Chat;
