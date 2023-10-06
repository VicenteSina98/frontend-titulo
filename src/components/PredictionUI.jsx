import { Link, useSearchParams } from "react-router-dom";
import Message from "./chat/Message";
import PropTypes from "prop-types";
import useQuoter from "../hooks/useQuoter";
import Prediction from "./chat/Prediction";
import { useAuthStore } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import Spinner from "./Spinner";
import { getUserFromToken } from "../helpers/auth";

const PredictionUI = () => {
  const { setInformacionPersonal, setAntecedentesMedicos } = useQuoter();
  // check user session
  const [isLoggedIn] = useAuthStore((state) => [state.isLoggedIn]);
  const navigate = useNavigate();
  if (!isLoggedIn()) navigate("/");
  const [loading, setLoading] = useState(true);
  const [mensajes, setMensajes] = useState([]);
  const [correlative, setCorrelative] = useState(0);
  const [data, setData] = useState([]);
  const [queryParameters] = useSearchParams();
  const api = useAxios();
  const setInfoPersonal = async () => {
    const dataUser = await getUserFromToken();
    setInformacionPersonal(dataUser.informacion_personal);
    setAntecedentesMedicos(dataUser.antecedentes_medicos);
    const predictions = await api.get(
      "/prediccion/" + dataUser.informacion_personal.user
    );
    const id = queryParameters.get("pred");
    setCorrelative(queryParameters.get("ind"));
    const filterPrediction = predictions.data.filter(
      (prediction) => prediction.id == id
    );
    const prediction = filterPrediction[0];
    setMensajes(prediction.mensajes);
    setData([
      prediction.enfermedad1,
      prediction.enfermedad2,
      prediction.enfermedad3,
      prediction.enfermedad4,
      prediction.enfermedad5,
    ]);
    setLoading(false);
  };
  const setBaseData = async () => {
    await setInfoPersonal();
  };
  useEffect(() => {
    setBaseData();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <main className="mx-auto mb-8 mt-20 flex w-2/3 flex-col justify-between gap-8">
      <h1 className="text-left text-2xl font-bold dark:text-white">
        Predicción {correlative}
      </h1>
      <section className="flex flex-col gap-4 overflow-y-auto">
        {mensajes.map((mensaje, index) => (
          <Message
            key={index}
            data={mensaje.texto}
            isIA={mensaje.enviado_por_bot}
          />
        ))}
        <Prediction data={data} />
      </section>

      <Link
        className="text-md w-full rounded-sm bg-cyan-700 py-4 text-center text-lg font-bold text-white hover:cursor-pointer dark:bg-cyan-800 md:mx-auto md:w-96 md:px-16"
        to={"/home/history"}
      >
        Volver
      </Link>
    </main>
  );
};

Prediction.propTypes = {
  prediction: PropTypes.object,
};

export default PredictionUI;
