import { useState } from "react";
import { register } from "../../helpers/auth";
import BlockError from "../error/BlockError";
import useQuoter from "../../hooks/useQuoter";
import PropTypes from "prop-types";

const MedicalDataForm = ({ password, setNextSection, setAccountCreated }) => {
  // states
  const { informacionPersonal, antecedentesMedicos, setAntecedentesMedicos } =
    useQuoter();
  const [sessionError, setSessionError] = useState({});

  // handlers
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error } = await register({
      informacionPersonal: { ...informacionPersonal, password },
      antecedentesMedicos,
    });
    if (!error) {
      setAccountCreated(true);
      setNextSection(false);
      return;
    }
    setSessionError(error);
    console.log(error);
  };

  return (
    <>
      <h2 className="mb-4 text-center text-lg font-bold dark:text-white">
        Información Médica
      </h2>
      {sessionError?.email?.map((error, index) => (
        <BlockError key={index} message={`Error en el correo: ${error}`} />
      ))}
      {sessionError?.password?.map((error, index) => (
        <BlockError key={index} message={`Error en la contraseña: ${error}`} />
      ))}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 sm:mx-auto sm:w-96 md:w-80"
      >
        {/* enfermedades cronicas */}
        <label
          htmlFor="enfermedadesCronicas"
          className="text-md dark:text-gray-200 lg:text-lg"
        >
          Enfermedades crónicas
        </label>
        <input
          type="text"
          name="enfermedadesCronicas"
          id="enfermedadesCronicas"
          onChange={(event) =>
            setAntecedentesMedicos({
              ...antecedentesMedicos,
              enfermedadesCronicas: event.target.value,
            })
          }
          className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
        />
        {/* historial de alergias */}
        <label
          htmlFor="historialAlergias"
          className="text-md dark:text-gray-200 lg:text-lg"
        >
          Historial de alergias
        </label>
        <input
          type="text"
          name="historialAlergias"
          id="historialAlergias"
          onChange={(event) =>
            setAntecedentesMedicos({
              ...antecedentesMedicos,
              historialAlergias: event.target.value,
            })
          }
          className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
        />
        {/* historial de cirugias */}
        <label
          htmlFor="historialCirugias"
          className="text-md dark:text-gray-200 lg:text-lg"
        >
          Historial de cirugías
        </label>
        <input
          type="text"
          name="historialCirugias"
          id="historialCirugias"
          onChange={(event) =>
            setAntecedentesMedicos({
              ...antecedentesMedicos,
              historialCirugias: event.target.value,
            })
          }
          className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
        />
        {/* historial de uso de medicamentos */}
        <label
          htmlFor="historialMedicamentos"
          className="text-md dark:text-gray-200 lg:text-lg"
        >
          Historial de uso de medicamentos
        </label>
        <input
          type="text"
          name="historialMedicamentos"
          id="historialMedicamentos"
          onChange={(event) =>
            setAntecedentesMedicos({
              ...antecedentesMedicos,
              historialMedicamentos: event.target.value,
            })
          }
          className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
        />
        {/* historial de enfermedades en la familia */}
        <label
          htmlFor="historialEnfermedadesFamilia"
          className="text-md dark:text-gray-200 lg:text-lg"
        >
          Historial de enfermedades en la familia
        </label>
        <input
          type="text"
          name="historialEnfermedadesFamilia"
          id="historialEnfermedadesFamilia"
          onChange={(event) =>
            setAntecedentesMedicos({
              ...antecedentesMedicos,
              historialEnfermedadesFamilia: event.target.value,
            })
          }
          className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
        />
        {/* historial de enfermedades infecciosas */}
        <label
          htmlFor="historialEnfermedadesInfecciosas"
          className="text-md dark:text-gray-200 lg:text-lg"
        >
          Historial de enfermedades infecciosas
        </label>
        <input
          type="text"
          name="historialEnfermedadesInfecciosas"
          id="historialEnfermedadesInfecciosas"
          onChange={(event) =>
            setAntecedentesMedicos({
              ...antecedentesMedicos,
              historialEnfermedadesInfecciosas: event.target.value,
            })
          }
          className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
        />
        {/* historial de habitos de la salud */}
        <label
          htmlFor="historialHabitosSalud"
          className="text-md dark:text-gray-200 lg:text-lg"
        >
          Historial de hábitos de la salud
        </label>
        <input
          type="text"
          name="historialHabitosSalud"
          id="historialHabitosSalud"
          onChange={(event) =>
            setAntecedentesMedicos({
              ...antecedentesMedicos,
              historialHabitosSalud: event.target.value,
            })
          }
          className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
        />
        <input
          type="submit"
          value="Crear mi cuenta"
          className="text-md mt-4 rounded-md bg-blue-700 p-2 text-white hover:cursor-pointer hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 lg:text-lg"
        />
        <input
          type="button"
          value="Volver a mi información personal"
          className={
            "text-md mt-4 rounded-md border-2 bg-transparent p-2 " +
            "border-blue-700 text-blue-700 hover:cursor-pointer " +
            "hover:border-blue-800 hover:text-blue-800 " +
            "dark:border-blue-500 dark:text-blue-500 " +
            "dark:hover:border-blue-400 dark:hover:text-blue-400 lg:text-lg"
          }
          onClick={() => setNextSection(false)}
        />
      </form>
    </>
  );
};

MedicalDataForm.propTypes = {
  setNextSection: PropTypes.func,
  setAccountCreated: PropTypes.func,
  password: PropTypes.string,
};

export default MedicalDataForm;
