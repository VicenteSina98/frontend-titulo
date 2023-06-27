import { createContext, useState } from "react";
import PropTypes from "prop-types";

const QuoterContext = createContext();

const QuoterProvider = ({ children }) => {
  // constants
  const questionsArray = [
    "¿Tiene alergía a algun/os de los siguientes medicamentos?",
    "¿Tiene alergía a algun/os de los siguientes alimentos?",
    "¿Presenta algun/os de los siguientes síntomas?",
    "¿Presenta problemas en algun/os de los 5 sentidos?",
    "¿Presenta inflamación en algun/as de las siguientes partes de su cuerpo?",
    "¿Presenta manchas en algun/as de las siguientes partes de su cuerpo?",
    "¿Presenta comezón en algun/as de las siguientes partes de su cuerpo?",
    "¿Siente algun/os de los siguientes tipos de dolor?",
    "¿Hace cuánto experimenta los síntomas?",
    "¿Con qué frecuencia experimenta los síntomas?",
    "¿Cuál/es de los siguientes medicamentos consume?",
    "¿Ha tenido contacto con algún enfermo?",
    "¿Qué diagnóstico tenía el enfermo?",
    "¿Tenía síntomas relacionados a los suyos?",
    "¿Ha tenido contacto con algún agente infeccioso o tóxico?",
    "¿De qué tipo era dicho agente?",
    "¿Ha viajado al extranjero recientemente?",
    "¿A qué país/es viajó?",
    "¿Cómo define su estado de ánimo? Especifique decaido, cansado, ansioso, normal, falta de apetito, etc.",
  ];
  const optionsArray = [
    [
      "Penicilina",
      "Sulfonamidas",
      "Aspirina",
      "Anestésicos",
      "Cefalosporiinas",
      "Antiinflamatorios",
      "Insulina",
      "Ninguno",
      "Otros",
    ],
    [
      "Frutos secos",
      "Mariscos",
      "Lácteos",
      "Huevos",
      "Trigo",
      "Frutas o verduras",
      "Soja",
      "Gluten",
      "Ninguno",
      "Otros",
    ],
    [
      "Fiebre",
      "Tos",
      "Dificultad respiratorio",
      "Pérdida del conocimiento",
      "Alteración del sueño",
      "Fatiga",
      "Ninguna",
    ],
    ["Audición", "Gusto", "Olfato", "Tacto", "Vista"],
    [
      "Cabeza",
      "Extremidades superiores",
      "Extremidades inferiores",
      "Amígdalas",
      "Aparato reproductor",
      "Abdomen",
      "Ninguno",
      "Otros",
    ],
    [
      "Cabeza",
      "Extremidades superiores",
      "Extremidades inferiores",
      "Cuello",
      "Espalda",
      "Aparato reproductor",
      "Abdomen",
      "Ninguno",
      "Otros",
    ],
    [
      "Cabeza",
      "Extremidades superiores",
      "Extremidades inferiores",
      "Cuello",
      "Espalda",
      "Aparato reproductor",
      "Abdomen",
      "Ninguno",
      "Otros",
    ],
    [
      "Dolor de cabeza",
      "Dolor en extremidades",
      "Dolor muscular",
      "Dolor abdominal",
      "Ninguno",
    ],
    ["Un día", "2 - 7 días", "Más de una semana", "Más de un mes"],
    [
      "Varias veces al día",
      "Una vez al día",
      "2 - 4 veces a la semana",
      "Una vez a la semana",
      "Varias veces al mes",
      "Una vez al mes",
    ],
    [
      "Anticoagulantes",
      "Analgésicos",
      "Antidepresivos",
      "Antihipertensivos",
      "Antidiabéticos",
      "Estatinas",
      "Ninguno",
      "Otros",
    ],
    ["Si", "No"],
    ["No aplica"],
    ["No aplica"],
    ["Si", "No"],
    ["Químico", "Biológico", "No aplica", "Otro"],
    ["Si", "No"],
    ["No aplica"],
    ["Decaido", "Cansado", "Ansioso", "Normal", "Falta de apetito", "Otros"],
  ];
  const URL = "http://127.0.0.1:8000/prediccion";

  // states
  const informacionPersonal = {
    nombre: "Usuario",
    fecha_nacimiento: "29 de julio de 1998",
    altura: 1.8,
    peso: 80.0,
    sexo: "M",
    antecedentes_medicos: {
      enfermedadesCronicas: null,
      historialAlergias: null,
      historialCirugias: null,
      historialMedicamentos: null,
      historialEnfermedadesFamilia: null,
      historialEnfermedadesInfecciosas: null,
      historialHabitosSalud: null,
    },
  };
  const [finish, setFinish] = useState(false);
  const [ok, setOk] = useState(false);
  const [questions, setQuestions] = useState([questionsArray[0]]);
  const [answers, setAnswers] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [prediction, setPrediction] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false
  );
  const [showSidebar, setShowSidebar] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checked, setChecked] = useState({ index: 0, checked: [] });

  return (
    <QuoterContext.Provider
      value={{
        questionsArray,
        optionsArray,
        URL,
        informacionPersonal,
        isDark,
        setIsDark,
        showSidebar,
        setShowSidebar,
        chatStarted,
        setChatStarted,
        finish,
        setFinish,
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
        checked,
        setChecked,
      }}
    >
      {children}
    </QuoterContext.Provider>
  );
};

QuoterProvider.propTypes = {
  children: PropTypes.any,
};

export { QuoterProvider };

export default QuoterContext;
