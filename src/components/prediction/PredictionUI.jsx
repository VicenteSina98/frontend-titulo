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
import { Spinner, Subtitle, Title } from "../UI/base";
import { PrimaryButton, SecondaryButton } from "../UI/buttons";
import { BlockNotification } from "../UI/notifications";
import Message from "../chat/Message";
import FileImg from "../../img/archivo-pdf.png";

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
  useEffect(() => {
    setError(false);
    setErrorMessage("");
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <section className="flex h-full w-full flex-col gap-8 px-0 py-2 sm:px-8 sm:py-4 md:py-6 lg:py-8 xl:px-36 xl:py-12 2xl:px-72 2xl:py-16">
      {/* mensaje de error en caso de que la API muera */}
      <BlockNotification
        content={errorMessage}
        typeNotification="error"
        hidden={!error ? "hidden" : ""}
      />
      <div
        className={`flex w-full flex-col items-center justify-center gap-2 ${
          error ? "hidden" : ""
        }`}
      >
        <Title content={name} />
        <Subtitle content={`Chat realizado el día: ${createdAt}`} />
      </div>
      <div
        className={`flex flex-col gap-4 overflow-y-auto ${
          error ? "hidden" : ""
        }`}
      >
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
          valueButton="Volver al historial"
          onClickFn={backToHistory}
          hidden={error ? "hidden" : ""}
        />
        <PrimaryButton
          valueButton="Exportar chat a PDF"
          onClickFn={generatePDF}
          src={FileImg}
          alt="archivo icono"
          imgRounded="rounded-none"
          display="flex justify-center items-center gap-3"
          hidden={error ? "hidden" : ""}
        />
        <PrimaryButton
          valueButton="Volver al historial"
          onClickFn={backToHistory}
          hidden={!error ? "hidden" : ""}
        />
      </div>
    </section>
  );
};

export default PredictionUI;
