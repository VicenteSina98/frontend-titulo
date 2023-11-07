// librerias
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// auxiliares
import useQuoter from "../hooks/useQuoter";
import { useAuthStore } from "../store/Auth";
import useAxios from "../hooks/useAxios";
import { getUserFromToken } from "../helpers/auth";
// componentes
import { Title, Spinner, Paragraph } from "../components/UI/base";
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
  useEffect(() => {
    setError(false);
    setErrorMessage("");
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
    <section className="flex h-full w-full flex-col items-center justify-start gap-8 px-0 py-2 sm:px-8 sm:py-4 md:py-6 lg:py-8 xl:px-36 xl:py-12 2xl:px-72 2xl:py-16">
      <Title content="Mis Predicciones" />
      {/* mensaje de error en caso de que la API muera */}
      <BlockNotification
        content={errorMessage}
        typeNotification="error"
        hidden={!error ? "hidden" : ""}
      />
      {/* historial */}
      {error ? null : (
        <div
          className={`flex w-full flex-col gap-8 overflow-y-auto p-0 ${
            history.length === 0 ? "hidden" : ""
          } sm:grid sm:grid-cols-2 sm:px-10 md:grid-cols-3 md:px-5`}
        >
          {history.map((prediction) => (
            <PredictionCard
              key={prediction.id}
              id={prediction.id}
              name={prediction.nombre}
            />
          ))}
        </div>
      )}
      {/* mensaje sin historial */}
      <Paragraph
        content="Aún no tienes predicciones realizadas..."
        hidden={error || history.length > 0 ? "hidden" : ""}
      />
      {/* botones */}
      {!error && history.length > 0 ? (
        <div className="w-full sm:px-10 md:px-5">
          <SecondaryButton
            valueButton="Ir al chat actual"
            onClickFn={goTo}
            onClickParams={["/home"]}
          />
        </div>
      ) : (
        <div className="w-full sm:px-10 md:px-5">
          <PrimaryButton
            valueButton="Ir al chat actual"
            onClickFn={goTo}
            onClickParams={["/home"]}
          />
        </div>
      )}
    </section>
  );
};

export default History;
