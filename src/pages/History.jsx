import useQuoter from "../hooks/useQuoter";
import { useAuthStore } from "../store/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const History = () => {
  const { predictionHistory, setIsDark } = useQuoter();
  // check user session
  const [isLoggedIn] = useAuthStore((state) => [state.isLoggedIn]);
  const navigate = useNavigate();
  if (!isLoggedIn()) navigate("/");
  // dark mode
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) =>
        setIsDark(event.matches ? true : false)
      );
  }, [setIsDark]);
  console.log(predictionHistory);
  return (
    <main className="mx-auto mb-8 mt-20 flex w-2/3 flex-col justify-start gap-8">
      <h2 className="text-left text-2xl font-bold dark:text-white">
        Mis predicciones
      </h2>
      {predictionHistory.length > 0 ? (
        predictionHistory.map((prediction, index) => (
          <div key={index} className="flex flex-col gap-4 p-2 border-b-2">
            <h3 className="text-left text-xl font-bold dark:text-white">
              Predicción {prediction.id}
            </h3>
            <Link
              className="w-fit rounded-md bg-cyan-700 p-2 text-lg text-white"
              to={`/home/prediction?pred=${prediction.id}`}
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
    </main>
  );
};

export default History;
