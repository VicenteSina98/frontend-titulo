// librerias
import { useState } from "react";
import PropTypes from "prop-types";
// auxiliares
import useQuoter from "../../hooks/useQuoter";
import useAxios from "../../hooks/useAxios";
// componentes
import { PrimaryButton, SecondaryButton } from "../UI/buttons";
import { Input, Spinner } from "../UI/base/";
import Check from "../../img/comprobar.png";

const SavePrediction = ({ show, setShow, saved, setSaved }) => {
  const { informacionPersonal, questions, answers } = useQuoter();
  const [namePrediction, setNamePrediction] = useState("");
  const [spinner, setSpinner] = useState(false);
  const api = useAxios();
  const queryAPI = async () => {
    setSpinner(true);
    const data = {
      id: informacionPersonal.user,
      nombre: namePrediction,
      preguntas: questions,
      respuestas: answers,
    };
    try {
      await api.post("/prediccion/guardar", data);
      setSaved(true);
    } catch (error) {
      console.log(error);
    }
    setSpinner(false);
  };
  const handleSavePrediction = async () => {
    if (namePrediction.length === 0) return;
    await queryAPI();
  };
  return (
    <section className={`modal ${show ? "block" : "hidden"}`}>
      <div className="modal-main rounded-md bg-white p-8 dark:bg-neutral-900">
        {spinner ? (
          <>
            <Spinner />
            <p className="text-center text-base font-bold dark:text-white sm:text-lg md:text-xl">
              Guardando chat...
            </p>
          </>
        ) : (
          <>
            <div className={saved ? "hidden" : ""}>
              <h1 className="mb-4 text-center text-xl font-bold dark:text-white">
                Define un nombre para reconocer este chat en tu historial
              </h1>
              <Input
                typeInput="text"
                nameInput="namePrediction"
                placeholderInput="Ej: Probable resfrío común"
                valueInput={namePrediction}
                onChangeFn={setNamePrediction}
              />
              <p className="mb-2 mt-4 text-center text-lg dark:text-white">
                Al guardar el chat en el historial, no podrá volver continuarlo.
                Con esto en consideración, ¿Desea guardar el chat?
              </p>
              <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row-reverse md:gap-8">
                <input
                  className={`my-2 w-full rounded border-2 border-cyan-700 bg-cyan-700 px-2 py-4 text-center text-xs font-bold capitalize text-white transition dark:border-cyan-800 dark:bg-cyan-800 sm:text-sm md:mx-auto md:w-1/2 md:text-base lg:text-lg ${
                    namePrediction.length === 0
                      ? "hover:cursor-not-allowed"
                      : "hover:cursor-pointer hover:bg-cyan-800 dark:hover:bg-cyan-700"
                  }`}
                  type="submit"
                  value="Si, guardar en el historial"
                  onClick={() => handleSavePrediction()}
                />
                <SecondaryButton
                  valueContent="No, cancelar y volver"
                  onClickFunction={setShow}
                  onClickFnParameters={[!show]}
                  textColorBase="text-red-700"
                  textColorDark="dark:text-red-400"
                  borderColorBase="border-red-700"
                  borderColorDark="dark:border-red-400"
                  hoverBgBase="hover:bg-red-700"
                  hoverBgDark="dark:hover:bg-red-800"
                />
              </div>
            </div>
            <div
              className={`flex flex-col items-center justify-center gap-4 ${
                !saved ? "hidden" : ""
              }`}
            >
              <img src={Check} alt="check imagen" className="w-2/12" />
              <p className="text-center text-sm font-bold dark:text-white sm:text-base md:text-lg">
                ¡Predicción guardada correctamente!
              </p>
              <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row-reverse md:gap-8">
                <PrimaryButton
                  valueContent="Cerrar y volver"
                  onClickFunction={setShow}
                  onClickFnParameters={[!show]}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

SavePrediction.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  saved: PropTypes.bool,
  setSaved: PropTypes.func,
};

export default SavePrediction;
