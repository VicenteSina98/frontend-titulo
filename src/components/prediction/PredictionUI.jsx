// librerias
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import fileDownload from "js-file-download";
// auxiliares
import { useAuthStore } from "../../store/Auth";
import { getUserFromToken } from "../../helpers/auth";
import useAxios from "../../hooks/useAxios";
import useQuoter from "../../hooks/useQuoter";
import { formatDatetime } from "../../helpers/functions";
// componentes
import Spinner from "../Spinner";
import Message from "../chat/Message";
import PrimaryButton from "../UI/buttons/PrimaryButton";
import SecondaryButton from "../UI/buttons/SecondaryButton";
// import TertiaryButton from "../UI/buttons/TertiaryButton";
import BlockNotification from "../UI/notifications/BlockNotification";

const PredictionUI = () => {
  const {
    setInformacionPersonal,
    setAntecedentesMedicos,
    error,
    errorMessage,
    setError,
    setErrorMessage,
  } = useQuoter();
  // check user session
  const [isLoggedIn] = useAuthStore((state) => [state.isLoggedIn]);
  const navigate = useNavigate();
  if (!isLoggedIn()) navigate("/");
  const [loading, setLoading] = useState(true);
  const [mensajes, setMensajes] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [queryParameters] = useSearchParams();
  const api = useAxios();
  const setInfoPersonal = async () => {
    try {
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
      setId(id);
      setName(prediction.nombre);
      setMensajes(prediction.mensajes);
      setCreatedAt(formatDatetime(prediction.creado_el));
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage(
        "Ha ocurrrido un error en el servidor y no se ha podido obtener el chat. Por favor inténtelo nuevamente"
      );
    }
    setLoading(false);
  };
  const setBaseData = async () => {
    await setInfoPersonal();
  };
  const backToHistory = () => {
    setError(false);
    setErrorMessage("");
    navigate("/home/history");
  };
  const generatePDF = async () => {
    setError(false);
    setErrorMessage("");
    await queryToPDF();
  };
  const queryToPDF = async () => {
    try {
      const media = await api.get(`/pdf/${id}`);
      console.log(media.data);
      if (media.data.status === 400) {
        setError(true);
        setErrorMessage(
          "Ha ocurrido un error en el servidor y no se ha generado el PDF. Por favor inténtelo nuevamente"
        );
        return;
      }
      const path = media.data.path;
      await axios
        .get(`${import.meta.env.VITE_API_URL}${path}`, { responseType: "blob" })
        .then((res) => fileDownload(res.data, name + ".pdf"));
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage(
        "Ha ocurrido un error en el servidor y no se ha generado el PDF. Por favor inténtelo nuevamente"
      );
    }
  };
  useEffect(() => {
    setBaseData();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <main className="mx-auto mb-8 mt-20 flex w-2/3 flex-col justify-between gap-8">
      {/* mensaje de error en caso de que la API muera */}
      <div className={!error ? "hidden" : ""}>
        <BlockNotification
          content={errorMessage}
          textColor="text-white"
          backgroundColor="bg-red-700"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-left text-2xl font-bold dark:text-white">{name}</h1>
        <h2 className="dark:text-white">Chat realizado el día: {createdAt}</h2>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto">
        {mensajes.map((mensaje, index) => (
          <Message
            key={index}
            data={mensaje.texto}
            isIA={mensaje.enviado_por_bot}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <SecondaryButton
          valueContent="Volver al historial"
          onClickFunction={backToHistory}
        />
        {/* <SecondaryButton valueContent="Enviar por email" /> */}
        <PrimaryButton
          valueContent="Exportar chat a PDF"
          onClickFunction={generatePDF}
        />
      </div>
    </main>
  );
};

export default PredictionUI;
