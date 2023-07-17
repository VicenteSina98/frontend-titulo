import { Link, useSearchParams } from "react-router-dom";
import Message from "./chat/Message";
import PropTypes from "prop-types";
import useQuoter from "../hooks/useQuoter";
import Prediction from "./chat/Prediction";

const PredictionUI = () => {
  const { predictionHistory } = useQuoter();
  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("pred");
  const filterPrediction = predictionHistory.filter(
    (prediction) => prediction.id == id
  );
  const prediction = filterPrediction[0];
  const mensajes = prediction.mensajes;
  const data = {
    posibles_enfermedades: [
      prediction.enfermedad1,
      prediction.enfermedad2,
      prediction.enfermedad3,
      prediction.enfermedad4,
      prediction.enfermedad5,
    ],
    posibles_profesionales: [
      prediction.profesional1,
      prediction.profesional2,
      prediction.profesional3,
      prediction.profesional4,
      prediction.profesional5,
    ],
  };
  return (
    <main className="mx-auto mb-8 mt-20 flex w-2/3 flex-col justify-between gap-8">
      <h1 className="text-left text-2xl font-bold dark:text-white">
        Predicción {id}
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
