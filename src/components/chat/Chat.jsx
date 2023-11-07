// librerias
import { useEffect, useRef, useState } from "react";
// auxiliares
import useQuoter from "../../hooks/useQuoter";
import useAxios from "../../hooks/useAxios";
import {
  matrixToObject,
  multipleOptionsSelected,
} from "../../helpers/functions";
import {
  EMPTY_MEDICAL_DATA,
  EMPTY_OTROS,
  OPTIONS_ARRAY,
  QUESTIONS_ARRAY,
} from "../../helpers/constants";
// componentes
import Welcome from "./Welcome";
import Message from "./Message";
import SavePrediction from "./SavePrediction";
import { Paragraph, Input, Spinner } from "../UI/base";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../UI/buttons";
import { BlockNotification } from "../UI/notifications";
import OptionsContainer from "./OptionsContainer";

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
    answer,
    setAnswer,
    questions,
    setQuestions,
    index,
    setIndex,
    saved,
    setSaved,
  } = useQuoter();
  const [showOtros, setShowOtros] = useState(false);
  const [otros, setOtros] = useState(EMPTY_OTROS);
  const [typeQuestion, setTypeQuestion] = useState("sintomas");
  const [check, setCheck] = useState(matrixToObject(OPTIONS_ARRAY));
  const [countCheck, setCountCheck] = useState(0);
  const [medicalData, setMedicalData] = useState(EMPTY_MEDICAL_DATA);
  const [extraAnswers, setExtraAnswers] = useState({
    10: "",
    11: "",
    13: "",
    15: "",
  });
  const [savePrediction, setSavePrediction] = useState(false);
  const [continueChat, setContinueChat] = useState(false);
  const [waiting, setWaiting] = useState(false);
  // ref
  const scrollRef = useRef(null);
  // hooks
  const api = useAxios();
  // handlers
  const queryGetPrediction = async () => {
    setError(false);
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
      const dataResponse = responseGeneracion.data.response;
      setPrediction(dataResponse);
      setQuestions([...questions, dataResponse]);
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage(
        "Ha ocurrido un error de servidor. Por favor inténtelo nuevamente"
      );
    }
    setSpinner(false);
    setFinish(true);
    setOk(true);
  };
  const handleGetPrediction = async () => {
    await queryGetPrediction();
  };
  const cleanOnSubmit = async (newIndex) => {
    setIndex(newIndex);
    setCountCheck(0);
    setShowOtros(false);
    setOtros(EMPTY_OTROS);
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
    // chequear seleccion de ninguno cuando ya hay otras opciones seleccionadas
    if (
      option === "Ninguno" &&
      multipleOptionsSelected(check, index) &&
      !check[index][option]
    )
      return;
    // chequear seleccion de opciones cuando ninguno esta seleccionada
    if (
      option !== "Ninguno" &&
      !check[index][option] &&
      check[index]["Ninguno"]
    )
      return;
    // actualizar seleccion de opciones
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
  const queryGetMessageResponse = async () => {
    setAnswers([...answers, answer]);
    setAnswer("");
    setWaiting(true);
    const data = {
      message: answer,
      prediction: prediction,
      medicalData: medicalData,
    };
    try {
      const responseMessage = await api.post("/chat/mensaje", data);
      const answerMessage = responseMessage.data.response;
      setQuestions([...questions, answerMessage]);
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage(
        "Ouch... ha ocurrido un error en el servidor. Por favor inténtelo nuevamente"
      );
    }
    setWaiting(false);
  };
  const handleSubmitMessage = async (event) => {
    event?.preventDefault();
    if (answer.length === 0) return;
    await queryGetMessageResponse();
  };
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
    setOtros(EMPTY_OTROS);
    setCheck(matrixToObject(OPTIONS_ARRAY));
    setCountCheck(0);
    setSavePrediction(false);
    setContinueChat(false);
    setWaiting(false);
    setSaved(false);
  };
  const cancelPrediction = () => {
    newPrediction();
    setChatStarted(false);
  };
  // effects
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
  useEffect(() => {
    setError(false);
    setErrorMessage("");
  }, []);
  return (
    <section className="flex h-full w-full flex-col gap-8 px-0 py-2 sm:px-8 sm:py-4 md:py-6 lg:py-8 xl:px-36 xl:py-12 2xl:px-72 2xl:py-16">
      {/* guardar prediccion */}
      <SavePrediction
        show={savePrediction}
        setShow={setSavePrediction}
        saved={saved}
        setSaved={setSaved}
      />
      {/* vista de bienvenida */}
      <Welcome />
      <div
        className={`flex h-full w-full flex-col justify-between gap-4 ${
          !chatStarted ? "hidden" : ""
        }`}
      >
        {/* mensajes del chat */}
        <div
          ref={scrollRef}
          className="flex w-full flex-col gap-4 overflow-y-auto"
        >
          {!spinner ? (
            questions.map((question, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Message data={question} isIA={true} />
                <Message data={answers[i]} isIA={false} />
              </div>
            ))
          ) : (
            <Spinner />
          )}
        </div>
        {/* botones */}
        <div
          className={`flex flex-col items-center justify-center gap-4 ${
            !finish ? "hidden" : ""
          }`}
        >
          <div className={`w-full ${spinner || continueChat ? "hidden" : ""}`}>
            {/* obtener prediccion */}
            <div
              className={`flex w-full  flex-col items-center justify-center gap-4 ${
                ok ? "hidden" : ""
              } md:flex-row-reverse md:gap-8`}
            >
              <PrimaryButton
                valueButton="Obtener predicción"
                onClickFn={handleGetPrediction}
              />
              <SecondaryButton
                valueButton="Cancelar chat"
                onClickFn={cancelPrediction}
              />
            </div>
            {/* guardar prediccion, continuar y nuevo chat */}
            <div
              className={`flex w-full flex-col gap-4 ${
                !ok || error || saved ? "hidden" : ""
              } md:hidden`}
            >
              <PrimaryButton
                valueButton="Guardar predicción"
                onClickFn={setSavePrediction}
                onClickParams={[!savePrediction]}
              />
              <SecondaryButton
                valueButton="Continuar chat"
                onClickFn={setContinueChat}
                onClickParams={[!continueChat]}
              />
              <TertiaryButton
                valueButton="Nuevo chat"
                onClickFn={newPrediction}
              />
            </div>
            <div className="hidden w-full md:flex md:gap-8">
              <TertiaryButton
                valueButton="Nuevo chat"
                onClickFn={newPrediction}
                hidden={!ok || error || saved ? "hidden" : ""}
                width="w-1/2"
              />
              <PrimaryButton
                valueButton="Guardar predicción"
                onClickFn={setSavePrediction}
                onClickParams={[!savePrediction]}
                hidden={!ok || error || saved ? "hidden" : ""}
              />
              <SecondaryButton
                valueButton="Continuar chat"
                onClickFn={setContinueChat}
                onClickParams={[!continueChat]}
                hidden={!ok || error || saved ? "hidden" : ""}
                width="w-1/2"
              />
            </div>
          </div>
          <Paragraph
            content="Generando predicción..."
            textSize="text-xl"
            textWeight="font-bold"
            hidden={!spinner ? "hidden" : ""}
          />
        </div>
        {/* opciones */}
        <form
          className={`flex w-full flex-col items-center justify-center gap-6 ${
            ok || finish ? "hidden" : ""
          }`}
          onSubmit={handleSubmitAnswer}
        >
          {/* input de opcion */}
          <OptionsContainer
            check={check}
            index={index}
            handleOptionSelect={handleOptionSelect}
            multipleOptionsSelected={multipleOptionsSelected}
          />
          {/* input text otros */}
          <Input
            typeInput="text"
            nameInput={toString(index)}
            idInput={toString(index)}
            placeholderInput="Especifique..."
            valueInput={otros[typeQuestion]}
            onChangeFn={updateOtros}
            hidden={!showOtros ? "hidden" : ""}
          />
          {/* siguiente pregunta y cancelar chat */}
          <div className="flex w-full flex-col-reverse items-center justify-center gap-4  sm:flex-row md:gap-8">
            <SecondaryButton
              valueButton="Cancelar chat"
              onClickFn={cancelPrediction}
            />
            <PrimaryButton
              valueButton="Siguiente pregunta"
              hover={
                countCheck === 0 || (showOtros && otros[typeQuestion] === "")
                  ? "hover:cursor-not-allowed"
                  : "hover:cursor-pointer hover:bg-teal-800 hover:border-teal-800 dark:hover:bg-teal-700 dark:hover:border-teal-700"
              }
            />
          </div>
        </form>
        {/* continuacion mensajes */}
        <div className={!continueChat || !finish ? "hidden" : ""}>
          <form
            className={`flex h-max w-full flex-col items-center justify-center gap-6 ${
              waiting || saved ? "hidden" : ""
            }`}
            onSubmit={handleSubmitMessage}
          >
            <Input
              typeInput="text"
              nameInput="message"
              placeholderInput="¡Consulte lo que desee!"
              valueInput={answer}
              onChangeFn={setAnswer}
              breakWords="break-words"
            />
            <div className="flex w-full flex-col items-center justify-center gap-4 md:hidden">
              <PrimaryButton
                valueButton="Enviar mensaje"
                hover={
                  answer.length === 0
                    ? "hover:cursor-not-allowed"
                    : "hover:cursor-pointer hover:bg-teal-800 hover:border-teal-800 dark:hover:bg-teal-700 dark:hover:border-teal-700"
                }
              />
              <div className="flex w-full items-center justify-center gap-4">
                <TertiaryButton
                  valueButton="Cancelar chat"
                  onClickFn={cancelPrediction}
                  textColor="text-red-700"
                  hover="hover:cursor-pointer hover:bg-red-200 dark:hover:text-red-700 dark:hover:bg-red-200"
                  dark="dark:text-red-200"
                />
                <SecondaryButton
                  valueButton="Finalizar y guardar chat"
                  onClickFn={setSavePrediction}
                  onClickParams={[!savePrediction]}
                />
              </div>
            </div>
            <div className="hidden md:flex md:w-full md:items-center md:justify-center md:gap-6 lg:gap-8">
              <TertiaryButton
                valueButton="Cancelar chat"
                onClickFn={cancelPrediction}
                width="w-1/2"
                textColor="text-red-700"
                hover="hover:cursor-pointer hover:bg-red-200 dark:hover:text-red-700 dark:hover:bg-red-200"
                dark="dark:text-red-200"
              />
              <PrimaryButton
                valueButton="Enviar mensaje"
                hover={
                  answer.length === 0
                    ? "hover:cursor-not-allowed"
                    : "hover:cursor-pointer hover:bg-teal-800 hover:border-teal-800 dark:hover:bg-teal-700 dark:hover:border-teal-700"
                }
              />
              <SecondaryButton
                valueButton="Finalizar y guardar chat"
                onClickFn={setSavePrediction}
                onClickParams={[!savePrediction]}
                width="w-1/2"
              />
            </div>
          </form>
        </div>
        {/* esperando respuesta */}
        <div className={`flex flex-col ${!waiting ? "hidden" : ""}`}>
          <Spinner />
          <Paragraph
            content="Generando respuesta..."
            textSize="text-xl"
            textWeight="font-bold"
          />
        </div>
        {/* reintento y nuevo chat */}
        <div
          className={`flex w-full flex-col gap-4 ${spinner ? "hidden" : ""}`}
        >
          <div className="flex w-full flex-col gap-4 md:flex-row-reverse">
            {/* reintentar prediccion en caso de error */}
            <PrimaryButton
              valueButton="Reintentar predicción"
              onClickFn={handleGetPrediction}
              hidden={!error ? "hidden" : ""}
            />
            {/* nuevo chat */}
            {error ? (
              <SecondaryButton
                valueButton="Nuevo chat"
                onClickFn={newPrediction}
                hidden={!ok && !finish && !saved ? "hidden" : ""}
              />
            ) : (
              <PrimaryButton
                valueButton="Nuevo chat"
                onClickFn={newPrediction}
                hidden={!ok || !finish || !saved ? "hidden" : ""}
              />
            )}
          </div>
          {/* mensaje de error en caso de que la API muera */}
          <BlockNotification
            content={errorMessage}
            typeNotification="error"
            hidden={!error ? "hidden" : ""}
          />
        </div>
      </div>
    </section>
  );
};

export default Chat;
