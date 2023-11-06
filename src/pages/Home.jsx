import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../components/chat/Chat";
import useQuoter from "../hooks/useQuoter";
import { useAuthStore } from "../store/Auth";
import { getUserFromToken } from "../helpers/auth";

export const Home = () => {
  const { setIsDark, setInformacionPersonal, setAntecedentesMedicos } =
    useQuoter();
  // check user session
  const [isLoggedIn] = useAuthStore((state) => [state.isLoggedIn]);
  const navigate = useNavigate();
  if (!isLoggedIn()) navigate("/");
  const setInfoPersonal = async () => {
    const dataUser = await getUserFromToken();
    setInformacionPersonal(dataUser.informacion_personal);
    setAntecedentesMedicos(dataUser.antecedentes_medicos);
  };
  const setBaseData = async () => {
    await setInfoPersonal();
  };
  useEffect(() => {
    setBaseData();
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
