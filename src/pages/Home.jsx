import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../components/chat/Chat";
import useQuoter from "../hooks/useQuoter";
import { useAuthStore } from "../store/Auth";
import { getPredictionHistory, getUserFromToken } from "../helpers/auth";

const Home = () => {
  const {
    informacionPersonal,
    setIsDark,
    setInformacionPersonal,
    setAntecedentesMedicos,
    setPredictionHistory,
  } = useQuoter();
  // check user session
  const [isLoggedIn] = useAuthStore((state) => [state.isLoggedIn]);
  const navigate = useNavigate();
  if (!isLoggedIn()) navigate("/");
  const setInfoPersonal = async () => {
    const dataUser = await getUserFromToken();
    setInformacionPersonal(dataUser.informacion_personal);
    setAntecedentesMedicos(dataUser.antecedentes_medicos);
  };
  const setPredHistory = async () => {
    const predicciones = await getPredictionHistory(
      informacionPersonal.informacion_personal["user"]
    );
    setPredictionHistory(predicciones);
  };
  useEffect(() => {
    setInfoPersonal();
    setPredHistory();
  }, []);
  // dark mode
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) =>
        setIsDark(event.matches ? true : false)
      );
  }, [setIsDark]);
  return <Chat />;
};

export default Home;
