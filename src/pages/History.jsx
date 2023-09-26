import useQuoter from "../hooks/useQuoter";
import { useAuthStore } from "../store/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import { getUserFromToken } from "../helpers/auth";

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
      <div className="grid w-2/3  grid-cols-1 gap-6 overflow-y-auto md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-x-12 mx-auto  mt-4">
        {history.length > 0 ? (
          history.map((prediction, index) => (
            <div
              key={index}
              className="flex w-full flex-col gap-16 p-2 dark:bg-neutral-600 items-center justify-center py-8 rounded-md shadow-md bg-gray-200"
            >
              <h3 className="text-left text-lg font-bold dark:text-white">
                Predicción {index + 1}
              </h3>
              <Link
                className="w-fit rounded-md bg-cyan-700 p-2 text-md text-white hover:bg-cyan-800"
                to={`/home/prediction?pred=${prediction.id}&ind=${index + 1}`}
              >
                Ver predicción
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-lg dark:text-white">
            Aun no tienes predicciones realizadas...
          </p>
        )}
      </div>
    </main>
  );
};

export default History;
