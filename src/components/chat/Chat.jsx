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
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import TertiaryButton from "../buttons/TertiaryButton";
import SavePrediction from "./SavePrediction";
import TextInput from "../inputs/TextInput";

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
  const [medicalData, setMedicalData] = useState({
    informacion_personal: {
      informacion_personal: informacionPersonal,
      antecedentes_medicos: antecedentesMedicos,
    },
    sintomas: "",
    problemas_sentidos: "",
    inflamacion: "",
    manchas: "",
    comezon: "",
    dolor: "",
    tiempo_sintomas: "",
    frecuencia_sintomas: "",
    consumo_medicamentos: "",
    contacto_enfermo: {
      ha_tenido_contacto: "",
      diagnostico: "",
      sintomas_relacionados: "",
    },
    contacto_toxico: {
      ha_tenido_contacto: "",
      tipo: "",
    },
    viaje_extranjero: {
      ha_viajado: "",
      paises: "",
    },
    estado_animo: "",
  });
  const [extraAnswers, setExtraAnswers] = useState({
    10: "",
    11: "",
    13: "",
    15: "",
  });
  const [savePrediction, setSavePrediction] = useState(false);
  const [continueChat, setContinueChat] = useState(false);
  const [continueMessages, setContinueMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [continueResponses, setContinueResponses] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [saved, setSaved] = useState(false);

  // ref
  const scrollRef = useRef(null);

  // hooks
  const api = useAxios();

  // handlers
  const handleGetPrediction = async () => {
    await queryGetPrediction();
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

  const handleSubmitAnswer = async (event) => {
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

  const handleChangeOtros = (event) => {
    updateOtros(event.target.value);
  };

  const updateOptionsSelected = (option) => {
    let copyCheck = { ...check };
    copyCheck[index][option] = !check[index][option];
    setCheck(copyCheck);
  };

  const handleOptionSelect = (event) => {
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
      updateOptionsSelected(option);
      updateOtros("");
      setShowOtros(false);
      setCountCheck(countCheck - 1);
    } else if (
      (option === "Otro" || option === "Otros") &&
      !check[index][option]
    ) {
      // seleccionar otros
      updateOptionsSelected(option);
      setShowOtros(true);
      setCountCheck(countCheck + 1);
    } else if (check[index][option]) {
      // deseleccionar opcion
      updateOptionsSelected(option);
      setCountCheck(countCheck - 1);
    } else {
      // seleccionar opcion
      updateOptionsSelected(option);
      setCountCheck(countCheck + 1);
    }
  };

  const handleSubmitMessage = async (event) => {
    event.preventDefault();
    if (currentMessage.length === 0) return;
    await queryGetMessageResponse();
  };

  // consult API
  const queryGetPrediction = async () => {
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
        diagnostico: answers[9] === "No" ? answers[10] : extraAnswers[10],
        sintomas_relacionados:
          answers[9] === "No" ? answers[11] : extraAnswers[11],
      },
      contacto_toxico: {
        ha_tenido_contacto: answers[9] === "No" ? answers[10] : answers[12],
        tipo:
          answers[9] === "No"
            ? answers[10] === "No"
              ? extraAnswers[13]
              : answers[11]
            : answers[12] === "No"
            ? extraAnswers[13]
            : answers[13],
      },
      viaje_extranjero: {
        ha_viajado:
          answers[9] === "No"
            ? answers[10] === "No"
              ? answers[11]
              : answers[12]
            : answers[12] === "No"
            ? answers[13]
            : answers[14],
        paises:
          answers[9] === "No"
            ? answers[10] === "No"
              ? answers[11] === "No"
                ? extraAnswers[15]
                : answers[12]
              : answers[12] === "No"
              ? extraAnswers[15]
              : answers[13]
            : answers[12] === "No"
            ? answers[13] === "No"
              ? extraAnswers[15]
              : answers[14]
            : answers[14] === "No"
            ? extraAnswers[15]
            : answers[15],
      },
      estado_animo: answers[12],
    };
    setMedicalData(data);
    try {
      const responseGeneracion = await api.post("/prediccion/generar", data);
      const dataResponse = responseGeneracion.data;
      setPrediction(dataResponse.response);
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

  const queryGetMessageResponse = async () => {
    setContinueMessages([...continueMessages, currentMessage]);
    setCurrentMessage("");
    setWaiting(true);
    const data = {
      message: currentMessage,
      prediction: prediction,
      medicalData: medicalData,
    };
    try {
      const responseMessage = await api.post("/chat/mensaje", data);
      console.log(responseMessage);
      const answerMessage = responseMessage.data.response;
      setContinueResponses([...continueResponses, answerMessage]);
    } catch (error) {
      console.log(error);
    }
    setWaiting(false);
  };

  // check if multiple options are selected
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
    setSavePrediction(false);
    setContinueChat(false);
    setContinueMessages([]);
    setCurrentMessage("");
    setContinueResponses([]);
    setWaiting(false);
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
      {/* guardar prediccion */}
      <SavePrediction
        show={savePrediction}
        setShow={setSavePrediction}
        saved={saved}
        setSaved={setSaved}
      />
      {/* mensajes del chat */}
      <section className="flex flex-col gap-4 overflow-y-auto">
        <div className={chatStarted ? "hidden" : ""}>
          <Welcome />
        </div>
        <div ref={scrollRef} className={!chatStarted ? "hidden" : ""}>
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
              <div className="flex flex-col gap-4">
                <Spinner />
                <p
                  className={`text-center text-3xl font-bold dark:text-white ${
                    !spinner ? "hidden" : ""
                  }`}
                >
                  Generando la predicción...
                </p>
              </div>
            )}
            {/* resultado */}
            <div
              className={Object.keys(prediction).length === 0 ? "hidden" : ""}
            >
              <Prediction data={prediction} />
            </div>
            {/* continuacion chat */}
            <div
              className={`flex flex-col gap-4 ${!continueChat ? "hidden" : ""}`}
            >
              {continueMessages.map((answer, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <Message data={answer} isIA={false} />
                  <div
                    className={i >= continueResponses.length ? "hidden" : ""}
                  >
                    <Message data={continueResponses[i]} isIA={true} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Inputs & Buttons */}
      <section className="flex flex-col gap-4">
        <div
          className={`flex w-full flex-col items-center justify-center ${
            chatStarted ? "hidden" : ""
          }`}
        >
          <PrimaryButton
            valueContent="Comenzar chat"
            onClickFunction={setChatStarted}
            onClickFnParameters={[!chatStarted]}
          />
        </div>
        <div className={!chatStarted ? "hidden" : ""}>
          {/* botones */}
          <div
            className={`flex flex-col items-center justify-center ${
              !finish ? "hidden" : ""
            }`}
          >
            {/* obtener prediccion */}
            <div
              className={`flex w-full  flex-col-reverse items-center justify-center gap-4 md:flex-row md:gap-8 ${
                ok || spinner || continueChat ? "hidden" : ""
              }`}
            >
              <SecondaryButton
                valueContent="Cancelar chat"
                onClickFunction={cancelPrediction}
                textColorBase="text-red-700"
                textColorDark="dark:text-red-400"
                borderColorBase="border-red-700"
                borderColorDark="dark:border-red-400"
                hoverBgBase="hover:bg-red-700"
                hoverBgDark="dark:hover:bg-red-800"
              />
              <PrimaryButton
                valueContent="Obtener predicción"
                onClickFunction={handleGetPrediction}
              />
            </div>
            {/* guardar prediccion, continuar y nuevo chat */}
            <div
              className={`flex w-full flex-col gap-4 ${
                !ok || spinner || error || continueChat ? "hidden" : ""
              }`}
            >
              <div className="flex w-full flex-col gap-4 md:flex-row-reverse md:gap-8">
                <PrimaryButton
                  valueContent="Guardar predicción"
                  onClickFunction={setSavePrediction}
                  onClickFnParameters={[!savePrediction]}
                />
                <SecondaryButton
                  valueContent="Continuar chat"
                  onClickFunction={setContinueChat}
                  onClickFnParameters={[!continueChat]}
                />
              </div>
              <TertiaryButton
                valueContent="Nuevo chat"
                onClickFunction={newPrediction}
              />
            </div>
            {/* solo nuevo chat */}
            <div className={ok && !spinner && error ? "" : "hidden"}>
              <PrimaryButton
                valueContent="Nuevo chat"
                onClickFunction={newPrediction}
              />
            </div>
          </div>
          {/* opciones */}
          <div className={finish ? "hidden" : ""}>
            <form
              className={`flex h-max w-full flex-col items-center justify-center gap-12 ${
                ok ? "hidden" : ""
              }`}
              onSubmit={handleSubmitAnswer}
            >
              {/* checkbox */}
              <div
                className={`grid w-full grid-cols-2 items-center justify-center gap-x-4 gap-y-4 text-center text-xs sm:grid-cols-4 sm:gap-y-8 sm:text-sm md:gap-x-6 md:gap-y-12 lg:gap-x-8 lg:gap-y-8`}
              >
                {OPTIONS_ARRAY[index]?.map((option, i) => (
                  <div
                    key={i}
                    onClick={handleOptionSelect}
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
                onChange={handleChangeOtros}
                value={otros[typeQuestion]}
                className={`w-full rounded-lg border-2 p-4 text-lg focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500  lg:text-lg ${
                  !showOtros ? "hidden" : ""
                }`}
              />
              <div className="flex w-full flex-col-reverse items-center justify-center gap-4  md:flex-row md:gap-8">
                <SecondaryButton
                  valueContent="Cancelar chat"
                  onClickFunction={cancelPrediction}
                  textColorBase="text-red-700"
                  textColorDark="dark:text-red-400"
                  borderColorBase="border-red-700"
                  borderColorDark="dark:border-red-400"
                  hoverBgBase="hover:bg-red-700"
                  hoverBgDark="dark:hover:bg-red-800"
                />
                <input
                  className={`my-2 w-full rounded border-2 border-cyan-700 bg-cyan-700 px-2 py-4 text-center text-xs font-bold capitalize text-white transition dark:border-cyan-800 dark:bg-cyan-800 sm:text-sm md:mx-auto md:w-1/2 md:text-base lg:text-lg ${
                    countCheck === 0 ||
                    (showOtros && otros[typeQuestion] === "")
                      ? "hover:cursor-not-allowed"
                      : "hover:cursor-pointer hover:bg-cyan-800 dark:hover:bg-cyan-700"
                  }`}
                  type="submit"
                  value="Siguiente pregunta"
                />
              </div>
            </form>
          </div>
          {/* continuacion mensajes */}
          <div className={saved ? "hidden" : ""}>
            <form
              className={`flex h-max w-full flex-col items-center justify-center gap-12 ${
                !continueChat || waiting ? "hidden" : ""
              }`}
              onSubmit={handleSubmitMessage}
            >
              <TextInput
                nameInput="message"
                placeholderContent="¡Consulte lo que desee!"
                valueContent={currentMessage}
                onChangeFunction={setCurrentMessage}
              />
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="flex w-full flex-col-reverse items-center justify-center gap-4 md:flex-row md:gap-8">
                  <SecondaryButton
                    valueContent="Finalizar y guardar chat"
                    onClickFunction={setSavePrediction}
                    onClickFnParameters={[!savePrediction]}
                  />
                  <input
                    className={`my-2 w-full rounded border-2 border-cyan-700 bg-cyan-700 px-2 py-4 text-center text-xs font-bold capitalize text-white transition dark:border-cyan-800 dark:bg-cyan-800 sm:text-sm md:mx-auto md:w-1/2 md:text-base lg:text-lg ${
                      currentMessage.length === 0
                        ? "hover:cursor-not-allowed"
                        : "hover:cursor-pointer hover:bg-cyan-800 dark:hover:bg-cyan-700"
                    }`}
                    type="submit"
                    value="Enviar mensaje"
                  />
                </div>
                <TertiaryButton
                  valueContent="Cancelar chat"
                  onClickFunction={cancelPrediction}
                  textColorBase="text-red-700"
                  hoverTextColorBase="hover:text-red-600"
                  textColorDark="dark:text-red-400"
                  hoverTextColorDark="dark:hover:text-red-500"
                />
              </div>
            </form>
          </div>
          {/* solo nuevo chat */}
          <div
            className={!saved ? "hidden" : ""}
          >
            <PrimaryButton
              valueContent="Nuevo chat"
              onClickFunction={newPrediction}
            />
          </div>
          {/* esperando respuesta */}
          <div className={!waiting ? "hidden" : ""}>
            <Spinner />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Chat;
