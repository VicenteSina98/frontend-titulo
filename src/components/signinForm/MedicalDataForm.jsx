import PropTypes from "prop-types";
import { register } from "../../helpers/auth";

const MedicalDataForm = ({
  informacionPersonal,
  password,
  antecedentesMedicos,
  setInformacionPersonal,
  setPassword,
  setAntecedentesMedicos,
  setSessionError,
  setNextSection,
  setAccountCreated,
}) => {
  // states
  const cleanStates = async () => {
    setInformacionPersonal({});
    setPassword("");
    setNextSection(false);
    setAccountCreated(true);
    setSessionError({});
  };

  // handlers
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error } = await register({
      informacionPersonal: { ...informacionPersonal, password },
      antecedentesMedicos,
    });
    if (!error) {
      await cleanStates();
      return;
    }
    setSessionError(error);
    console.log(error);
  };

  return (
    <div className="mx-auto flex flex-col gap-1 overflow-y-auto sm:w-11/12  md:w-5/6 lg:w-2/3 xl:w-1/2 2xl:w-5/12">
      <h2 className="mb-4 text-center text-lg font-bold dark:text-white">
        Información Médica
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-8">
          {/* enfermedades cronicas */}
          <div className="flex flex-col gap-1">
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
          </div>
          <div className="flex flex-col gap-1">
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
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-8">
          <div className="flex flex-col gap-1">
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
          </div>
          <div className="flex flex-col gap-1">
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
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-8">
          <div className="flex flex-col gap-1">
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
          </div>
          <div className="flex flex-col gap-1">
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
          </div>
        </div>

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
    </div>
  );
};

MedicalDataForm.propTypes = {
  informacionPersonal: PropTypes.object,
  password: PropTypes.string,
  antecedentesMedicos: PropTypes.object,
  setInformacionPersonal: PropTypes.func,
  setPassword: PropTypes.func,
  setAntecedentesMedicos: PropTypes.func,
  setSessionError: PropTypes.func,
  setNextSection: PropTypes.func,
  setAccountCreated: PropTypes.func,
};

export default MedicalDataForm;
