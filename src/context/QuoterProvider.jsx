import { createContext, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const QuoterContext = createContext();

const personalData = {
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

const QuoterProvider = ({ children }) => {
  const [data, setData] = useState({ informacion_personal: personalData });
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
  const [contrario, setContrario] = useState(true);
  const [finish, setFinish] = useState(false);
  const [ok, setOk] = useState(false);
  const [questions, setQuestions] = useState([questionsArray[0]]);
  const [answers, setAnswers] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [prediction, setPrediction] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false
  );
  const [showSidebar, setShowSidebar] = useState(false);
  // refs
  const chatDataEndRef = useRef(null);
  // functions
  const scrollToBottom = () => {
    chatDataEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const transformToText = (data) => {
    let text = "5 enfermedades que, probablemente, puedes tener:<br>";
    data["posibles_enfermedades"].forEach((d) => (text += d));
    text += "Además, puedes recurrir a los siguientes profesionales: ";
    data["posibles_profesionales"].forEach((d) => (text += d));
    return text;
  };
  useEffect(() => {
    if (answers.length === 19) {
      setData({
        ...data,
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
      });
    }
  }, [answers]);
  return (
    <QuoterContext.Provider
      value={{
        contrario,
        setContrario,
        ok,
        setOk,
        finish,
        setFinish,
        data,
        setData,
        isDark,
        setIsDark,
        showSidebar,
        setShowSidebar,
        questionsArray,
        questions,
        setQuestions,
        answers,
        setAnswers,
        chatStarted,
        setChatStarted,
        answer,
        setAnswer,
        prediction,
        setPrediction,
        spinner,
        setSpinner,
        chatDataEndRef,
        URL,
        scrollToBottom,
        transformToText,
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
