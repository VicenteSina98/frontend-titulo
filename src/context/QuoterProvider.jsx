import { createContext, useState } from "react";
import PropTypes from "prop-types";

const QuoterContext = createContext();

const QuoterProvider = ({ children }) => {
  // constants
  const questionsArray = [
    "¿Tiene alergía a algun/os de los siguientes medicamentos? Especifique penicilina, sulfonamidas, aspirina, anestésicos, cefalosporinas, antiinflamatorios no esteroides, insulina u otros.",
    "¿Tiene alergía a algun/os de los siguientes alimentos? Especifique frutos secos, mariscos, lácteos, huevos, trigo, frutas o verduras, soja, gluten u otros.",
    "¿Presenta algun/os de los siguientes síntomas? Especifique fiebre, tos, dificultad respiratoria, pérdida del conocimiento, alteración del sueño o fatiga",
    "¿Presenta problemas en algun/os de los 5 sentidos? Especifique audición, gusto, olfato, tacto y vista",
    "¿Presenta inflamación en algun/as de las siguientes partes de su cuerpo? Especifique cabeza, extremidades superiores, extremidades inferiores, amígdalas, aparato reproductor, abdomen u otros.",
    "¿Presenta manchas en algun/as de las siguientes partes de su cuerpo? Especifique cabeza, extremidades superiores, extremidades inferiores, cuello, espalda, aparato reproductor, abdomen u otros.",
    "¿Presenta comezón en algun/as de las siguientes partes de su cuerpo? Especifique cabeza, extremidades superiores, extremidades inferiores, cuello, espalda, aparato reproductor, abdomen u otros.",
    "¿Siente algun/os de los siguientes tipos de dolor? Especifique dolor de cabeza, dolor en extremidades, dolor muscular o dolor abdominal.",
    "¿Hace cuánto experimenta los síntomas? Ejemplo: un día, 4 días, más de una semana, etc.",
    "¿Con qué frecuencia experimenta los síntomas?",
    "¿Cuál/es de los siguientes medicamentos consume? Especifique anticoagulantes, analgésicos, antidepresivos, antihipertensivos,antidiabéticos, estatinas u otros.",
    "¿Ha tenido contacto con algún enfermo?",
    "¿Qué diagnóstico tenía el enfermo? Si no tuvo contacto ingrese no aplica.",
    "¿Tenía síntomas relacionados a los suyos? Especifique cuáles.  Si no tuvo contacto ingrese no aplica.",
    "¿Ha tenido contacto con algún agente infeccioso o tóxico?",
    "¿De qué tipo era dicho agente? Especifique químico, biológico u otro.  Si no tuvo contacto ingrese no aplica.",
    "¿Ha viajado al extranjero recientemente?",
    "¿A qué país/es viajó? Especifique.  Si no ha viajado ingrese no aplica.",
    "¿Cómo define su estado de ánimo? Especifique decaido, cansado, ansioso, normal, falta de apetito, etc.",
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

  return (
    <QuoterContext.Provider
      value={{
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
        questionsArray,
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
