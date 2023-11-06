// librerias
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// auxiliares
import useQuoter from "../hooks/useQuoter";
import { useAuthStore } from "../store/Auth";
import useAxios from "../hooks/useAxios";
import { getUserFromToken } from "../helpers/auth";
// componentes
import { Title, Spinner } from "../components/UI/base";
import { PrimaryButton, SecondaryButton } from "../components/UI/buttons";
import { BlockNotification } from "../components/UI/notifications";
import PredictionCard from "../components/prediction/PredictionCard";

export const History = () => {
  const navigate = useNavigate();
  const {
    error,
    errorMessage,
    setIsDark,
    setInformacionPersonal,
    setAntecedentesMedicos,
    setError,
    setErrorMessage,
  } = useQuoter();
  // check user session
  const [isLoggedIn] = useAuthStore((state) => [state.isLoggedIn]);
  if (!isLoggedIn()) navigate("/");
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const api = useAxios();
  const setInfoPersonal = async () => {
    const dataUser = await getUserFromToken();
    setInformacionPersonal(dataUser.informacion_personal);
    setAntecedentesMedicos(dataUser.antecedentes_medicos);
    try {
      const predictions = await api.get(
        "/prediccion/" + dataUser.informacion_personal.user
      );
      setHistory(predictions.data);
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage(
        "Ha ocurrido un error de servidor. Por favor inténtelo nuevamente"
      );
    }
    setLoading(false);
  };
  const setBaseData = async () => {
    await setInfoPersonal();
  };
  const goTo = (navTo) => {
    navigate(navTo);
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

  return loading ? (
    <Spinner />
  ) : (
    <main className="mx-auto mb-8 mt-20 flex w-2/3 flex-col justify-start gap-8">
      <Title content="Mis Predicciones" />
      {/* mensaje de error en caso de que la API muera */}
      <div className={!error ? "hidden" : ""}>
        <BlockNotification
          content={errorMessage}
          textColor="text-white"
          backgroundColor="bg-red-700"
        />
      </div>
      <div
        className={`flex w-full flex-col gap-8 overflow-y-auto ${
          error || history.length === 0 ? "hidden" : ""
        }`}
      >
        {history.map((prediction) => (
          <PredictionCard
            key={prediction.id}
            id={prediction.id}
            name={prediction.nombre}
          />
        ))}
      </div>
      <p
        className={`text-center text-lg dark:text-white ${
          error || history.length > 0 ? "hidden" : ""
        }`}
      >
        Aun no tienes predicciones realizadas...
      </p>
      {!error && history.length > 0 ? (
        <SecondaryButton
          valueContent="Ir al chat actual"
          onClickFunction={goTo}
          onClickFnParameters={["/home"]}
        />
      ) : (
        <PrimaryButton
          valueContent="Ir al chat actual"
          onClickFunction={goTo}
          onClickFnParameters={["/home"]}
        />
      )}
    </main>
  );
};

export default History;
