import useQuoter from "../hooks/useQuoter";
import { useAuthStore } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import { getUserFromToken } from "../helpers/auth";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";

const History = () => {
  const { setIsDark, setInformacionPersonal, setAntecedentesMedicos } =
    useQuoter();
  // check user session
  const [isLoggedIn] = useAuthStore((state) => [state.isLoggedIn]);
  const navigate = useNavigate();
  if (!isLoggedIn()) navigate("/");
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const api = useAxios();
  const setInfoPersonal = async () => {
    const dataUser = await getUserFromToken();
    setInformacionPersonal(dataUser.informacion_personal);
    setAntecedentesMedicos(dataUser.antecedentes_medicos);
    const predictions = await api.get(
      "/prediccion/" + dataUser.informacion_personal.user
    );
    setHistory(predictions.data);
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
      <h2 className="text-left text-2xl font-bold dark:text-white">
        Mis predicciones
      </h2>
      <div
        className={`mx-auto mt-4  grid w-2/3 grid-cols-1 gap-6 overflow-y-auto md:grid-cols-2 md:gap-8 lg:grid-cols-3  lg:gap-x-12 ${
          history.length === 0 ? "hidden" : ""
        }`}
      >
        {history.map((prediction, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-center justify-center gap-8 rounded-md bg-gray-200 p-2 py-8 shadow-md dark:bg-neutral-600"
          >
            <h3 className="text-left text-lg font-bold dark:text-white">
              {prediction.nombre}
            </h3>
            <PrimaryButton
              valueContent="Ver chat"
              onClickFunction={goTo}
              onClickFnParameters={[`/home/prediction?pred=${prediction.id}`]}
            />
          </div>
        ))}
      </div>
      <p
        className={`text-center text-lg dark:text-white ${
          history.length > 0 ? "hidden" : ""
        }`}
      >
        Aun no tienes predicciones realizadas...
      </p>
      {history.length > 0 ? (
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
