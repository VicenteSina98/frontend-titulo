import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { QUESTIONS_ARRAY } from "../helpers/constants";

const QuoterContext = createContext();

const QuoterProvider = ({ children }) => {
  // states
  const [informacionPersonal, setInformacionPersonal] = useState({
    email: "",
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    fechaNacimiento: "",
    altura: "",
    peso: "",
    sexo: "",
  });
  const [antecedentesMedicos, setAntecedentesMedicos] = useState({
    enfermedadesCronicas: "",
    historialAlergias: "",
    historialCirugias: "",
    historialMedicamentos: "",
    historialEnfermedadesFamilia: "",
    historialEnfermedadesInfecciosas: "",
    historialHabitosSalud: "",
  });
  const [finish, setFinish] = useState(false);
  const [ok, setOk] = useState(false);
  const [questions, setQuestions] = useState([QUESTIONS_ARRAY[0]]);
  const [answers, setAnswers] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [prediction, setPrediction] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false
  );
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  return (
    <QuoterContext.Provider
      value={{
        informacionPersonal,
        setInformacionPersonal,
        antecedentesMedicos,
        setAntecedentesMedicos,
        isDark,
        setIsDark,
        showSidebar,
        setShowSidebar,
        showUserMenu,
        setShowUserMenu,
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
        index,
        setIndex,
        saved,
        setSaved,
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
