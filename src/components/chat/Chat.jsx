import Welcome from "./Welcome";
// import Error from "../SigninFormError";
import Spinner from "../Spinner";
import Message from "./Message";
import useQuoter from "../../hooks/useQuoter";
import { useEffect, useRef, useState } from "react";
import Prediction from "./Prediction";
import useAxios from "../../hooks/useAxios";
import BlockError from "../error/BlockError";
import { OPTIONS_ARRAY, QUESTIONS_ARRAY } from "../../helpers/constants";
import { objHasOnlyEmpty } from "../../helpers/functions";

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
    checked,
    setChecked,
    predictionHistory,
    setPredictionHistory,
  } = useQuoter();
  // state para otros
  const [showOtros, setShowOtros] = useState(false);
  const [otros, setOtros] = useState({
    alergiaMedicamentos: "", // index = 0
    alergiaAlimentos: "", // index = 1
    inflamacion: "", // index = 4
    manchas: "", // index = 5
    comezon: "", // index = 6
    consumeMedicamentos: "", // index = 10
    agenteInfeccioso: "", // index = 15
    estadoAnimo: "", // index = 18
  });
  const [typeQuestion, setTypeQuestion] = useState("");
  // ref
  const scrollRef = useRef(null);

  // hooks
  const api = useAxios();

  // handlers
  const handleClick = async () => {
    await queryAPI();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checked.checked.length === 0) return;
    // check otros
    if (checked.checked.includes("Otros") || checked.checked.includes("Otro")) {
      setChecked(checked.checked.splice(checked.checked.indexOf("Otros"), 1));
      setChecked(checked.checked.push(otros[typeQuestion]));
    }
    // save data
    let saveAnswer = checked.checked.join(", ");
    setChecked({ index: checked.index + 1, checked: [] });
    setAnswers([...answers, saveAnswer]);
    // clean otros
    setShowOtros(false);
    setOtros({
      alergiaMedicamentos: "", // index = 0
      alergiaAlimentos: "", // index = 1
      inflamacion: "", // index = 4
      manchas: "", // index = 5
      comezon: "", // index = 6
      consumeMedicamentos: "", // index = 10
      agenteInfeccioso: "", // index = 15
      estadoAnimo: "", // index = 18
    });
    setTypeQuestion("");
  };

  const configTypeQuestions = () => {
    switch (checked.index) {
      case 0:
        setTypeQuestion("alergiaMedicamentos");
        break;
      case 1:
        setTypeQuestion("alergiaAlimentos");
        break;
      case 4:
        setTypeQuestion("inflamacion");
        break;
      case 5:
        setTypeQuestion("manchas");
        break;
      case 6:
        setTypeQuestion("comezon");
        break;
      case 10:
        setTypeQuestion("consumeMedicamentos");
        break;
      case 15:
        setTypeQuestion("agenteInfeccioso");
        break;
      case 18:
        setTypeQuestion("estadoAnimo");
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    switch (checked.index) {
      case 0:
        setOtros({ ...otros, alergiaMedicamentos: event.target.value });
        setTypeQuestion("alergiaMedicamentos");
        break;
      case 1:
        setOtros({ ...otros, alergiaAlimentos: event.target.value });
        setTypeQuestion("alergiaAlimentos");
        break;
      case 4:
        setOtros({ ...otros, inflamacion: event.target.value });
        setTypeQuestion("inflamacion");
        break;
      case 5:
        setOtros({ ...otros, manchas: event.target.value });
        setTypeQuestion("manchas");
        break;
      case 6:
        setOtros({ ...otros, comezon: event.target.value });
        setTypeQuestion("comezon");
        break;
      case 10:
        setOtros({ ...otros, consumeMedicamentos: event.target.value });
        setTypeQuestion("consumeMedicamentos");
        break;
      case 15:
        setOtros({ ...otros, agenteInfeccioso: event.target.value });
        setTypeQuestion("agenteInfeccioso");
        break;
      case 18:
        setOtros({ ...otros, estadoAnimo: event.target.value });
        setTypeQuestion("estadoAnimo");
        break;
      default:
        break;
    }
  };

  const handleCheck = (event) => {
    let updatedList = [...checked.checked];
    if (event.target.checked) {
      updatedList = [...checked.checked, event.target.value];
    } else {
      updatedList.splice(checked.checked.indexOf(event.target.value), 1);
    }
    setChecked({ ...checked, checked: updatedList });
    // mostrar input texto otros
    if (updatedList.includes("Otros") || checked.checked.includes("Otro")) setShowOtros(true);
    else setShowOtros(false);
    configTypeQuestions()
  };

  // consult API
  const queryAPI = async () => {
    setSpinner(true);
    const data = {
      informacion_personal: {
        ...informacionPersonal,
        antecedentes_medicos: antecedentesMedicos,
      },
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
    try {
      const responseGeneracion = await api.post("/prediccion/generar", data);
      const dataResponse = responseGeneracion.data;
      setPrediction(dataResponse);
      const responseGuardado = await api.post("/prediccion/guardar", {
        id: informacionPersonal.user,
        preguntas: questions,
        respuestas: answers,
        enfermedad1: dataResponse.posibles_enfermedades[0] ?? "",
        enfermedad2: dataResponse.posibles_enfermedades[1] ?? "",
        enfermedad3: dataResponse.posibles_enfermedades[2] ?? "",
        enfermedad4: dataResponse.posibles_enfermedades[3] ?? "",
        enfermedad5: dataResponse.posibles_enfermedades[4] ?? "",
        profesional1: dataResponse.posibles_profesionales[0] ?? "",
        profesional2: dataResponse.posibles_profesionales[1] ?? "",
        profesional3: dataResponse.posibles_profesionales[2] ?? "",
        profesional4: dataResponse.posibles_profesionales[3] ?? "",
        profesional5: dataResponse.posibles_profesionales[4] ?? "",
      });
      setPredictionHistory([...predictionHistory, responseGuardado]);
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

  // reset states
  const newPrediction = () => {
    setFinish(false);
    setOk(false);
    setQuestions([QUESTIONS_ARRAY[0]]);
    setAnswers([]);
    setAnswer("");
    setPrediction({});
    setChecked({ index: 0, checked: [] });
    setError(false);
  };

  // effects
  useEffect(() => {
    if (answers.length === 19) setFinish(true);
  }, [answers]);

  useEffect(() => {
    if (
      answers.length > 0 &&
      !questions.includes(QUESTIONS_ARRAY[questions.length])
    ) {
      setAnswer("");
      if (QUESTIONS_ARRAY[questions.length] !== undefined)
        setQuestions([...questions, QUESTIONS_ARRAY[questions.length]]);
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
    <main className="mx-auto mb-8 mt-20 flex w-2/3 flex-col justify-between gap-8">
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
          {/* opciones */}
          <div className={finish ? "hidden" : ""}>
            <form
              className={`flex flex-col items-center justify-center gap-8 ${
                ok ? "hidden" : ""
              }`}
              onSubmit={handleSubmit}
            >
              <div
                className={`grid grid-cols-2 ${
                  OPTIONS_ARRAY[checked.index] % 2 === 0
                    ? "md:grid-cols-2"
                    : "md:grid-cols-3"
                } md:text-md gap-4 text-xs sm:text-sm lg:text-lg`}
              >
                {OPTIONS_ARRAY[checked.index]?.map((option, index) => (
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
                type="text"
                name={OPTIONS_ARRAY[checked.index]}
                id={OPTIONS_ARRAY[checked.index]}
                placeholder="Especifique"
                onChange={handleChange}
                value={otros[typeQuestion]}
                className={
                  "w-full rounded-lg border-2 p-4 text-lg focus:border-blue-600 focus:outline-none " +
                  "dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 " +
                  `md:w-auto lg:text-lg ${!showOtros ? "hidden" : ""}`
                }
              />
              <input
                className={`text-md w-full rounded-sm bg-cyan-700 py-4 text-lg font-bold text-white dark:bg-cyan-800 md:w-auto md:px-16 ${
                  checked.checked.length === 0 || objHasOnlyEmpty(otros)
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
