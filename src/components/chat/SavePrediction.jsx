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
import { Paragraph, Title } from "../UI/base";

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
    <section className={`modal z-50 ${show ? "block" : "hidden"}`}>
      <div className="modal-main rounded-md bg-white p-8 dark:bg-neutral-900">
        {spinner ? (
          <>
            <Spinner />
            <Paragraph content="Guardando chat..." textWeight="font-bold" />
          </>
        ) : (
          <>
            <div
              className={`flex w-full flex-col items-center justify-center gap-6 sm:px-20 md:px-36 lg:px-56 xl:px-64 2xl:px-72 ${
                saved ? "hidden" : ""
              }`}
            >
              <Title content="Define un nombre para reconocer este chat en tu historial" />
              <Input
                typeInput="text"
                nameInput="namePrediction"
                placeholderInput="Ej: Probable resfrío común"
                valueInput={namePrediction}
                onChangeFn={setNamePrediction}
              />
              <Paragraph
                content="Al guardar el chat en el historial, no podrá volver continuarlo.
                Con esto en consideración, ¿Desea guardar el chat?"
              />
              <div className="flex w-full flex-col items-center justify-center gap-4 xl:flex-row-reverse xl:gap-8">
                <PrimaryButton
                  valueButton="Si, guardar en el historial"
                  hover={
                    namePrediction.length === 0
                      ? "hover:cursor-not-allowed"
                      : "hover:cursor-pointer hover:bg-teal-800 hover:border-teal-800 dark:hover:bg-teal-700 dark:hover:border-teal-700"
                  }
                  onClickFn={handleSavePrediction}
                />
                <SecondaryButton
                  valueButton="No, cancelar y volver"
                  onClickFn={setShow}
                  onClickParams={[!show]}
                />
              </div>
            </div>
            <div
              className={`flex flex-col items-center justify-center gap-4 ${
                !saved ? "hidden" : ""
              } sm:px-20 md:px-36 lg:px-56 xl:px-64 2xl:px-72`}
            >
              <img src={Check} alt="check imagen" className="w-2/12" />
              <p className="text-center text-sm font-bold dark:text-white sm:text-base md:text-lg">
                ¡Predicción guardada correctamente!
              </p>
              <div className="w-full  ">
                <PrimaryButton
                  valueButton="Cerrar y volver"
                  onClickFn={setShow}
                  onClickParams={[!show]}
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
