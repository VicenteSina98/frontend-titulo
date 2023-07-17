import { useSearchParams } from "react-router-dom";
import Message from "./chat/Message";
import PropTypes from "prop-types";
import { getPredictionHistory } from "../helpers/auth";

const Prediction = () => {
  const [queryParams] = useSearchParams();
  let allPrediction = getPredictionHistory(queryParams.get("user"));
  allPrediction = allPrediction.filter(
    (prediction) => prediction.id === queryParams.get("pred")
  );
  const prediction = allPrediction[0]
  return prediction.mensaje.map(
    <Message data={prediction.texto} isIA={prediction.enviado_por_bot} />
  );
};

Prediction.propTypes = {
  prediction: PropTypes.object,
};

export default Prediction;
