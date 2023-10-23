import { useSearchParams } from "react-router-dom";
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
import PrimaryButton from "./buttons/PrimaryButton";

const PredictionUI = () => {
  const { setInformacionPersonal, setAntecedentesMedicos } = useQuoter();
  // check user session
  const [isLoggedIn] = useAuthStore((state) => [state.isLoggedIn]);
  const navigate = useNavigate();
  if (!isLoggedIn()) navigate("/");
  const [loading, setLoading] = useState(true);
  const [mensajes, setMensajes] = useState([]);
  const [name, setName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
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
    const filterPrediction = predictions.data.filter(
      (prediction) => prediction.id == id
    );
    const prediction = filterPrediction[0];
    setName(prediction.nombre);
    setMensajes(prediction.mensajes);
    setCreatedAt(formatDatetime(prediction.creado_el));
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
  const backToHistory = () => {
    navigate("/home/history");
  };
  const formatDatetime = (datetime) => {
    const splitDatetime = datetime.split("-");
    const year = splitDatetime[0];
    const month = splitDatetime[1];
    const day = splitDatetime[2].split("T")[0];
    return [day, month, year].join("-");
  };
  useEffect(() => {
    setBaseData();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <main className="mx-auto mb-8 mt-20 flex w-2/3 flex-col justify-between gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-left text-2xl font-bold dark:text-white">{name}</h1>
        <h2 className="dark:text-white">Realizado el día: {createdAt}</h2>
      </div>
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
      <PrimaryButton
        valueContent="Volver al historial"
        onClickFunction={backToHistory}
      />
    </main>
  );
};

Prediction.propTypes = {
  prediction: PropTypes.object,
};

export default PredictionUI;
