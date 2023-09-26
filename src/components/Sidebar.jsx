import { useNavigate } from "react-router-dom";
import useQuoter from "../hooks/useQuoter";
import { logout } from "../helpers/auth";
import { QUESTIONS_ARRAY } from "../helpers/constants";

const Sidebar = () => {
  // states
  const {
    setInformacionPersonal,
    showSidebar,
    isDark,
    informacionPersonal,
    setAntecedentesMedicos,
    setShowSidebar,
    setChatStarted,
    setFinish,
    setAnswers,
    setError,
    setErrorMessage,
    setPrediction,
    setOk,
    setAnswer,
    setQuestions,
    setChecked,
  } = useQuoter();
  const cleanStates = async () => {
    setInformacionPersonal({
      email: "",
      nombres: "",
      primerApellido: "",
      segundoApellido: "",
      fechaNacimiento: "",
      altura: "",
      peso: "",
      sexo: "",
    });
    setAntecedentesMedicos({
      enfermedadesCronicas: "",
      historialAlergias: "",
      historialCirugias: "",
      historialMedicamentos: "",
      historialEnfermedadesFamilia: "",
      historialEnfermedadesInfecciosas: "",
      historialHabitosSalud: "",
    });
    setShowSidebar(false);
    setChatStarted(false);
    setFinish(false);
    setAnswers([]);
    setError(false);
    setErrorMessage("");
    setPrediction([]);
    setOk(false);
    setAnswer("");
    setQuestions([QUESTIONS_ARRAY[0]]);
    setChecked({ index: 0, checked: [] });
  };
  // hooks
  const navigate = useNavigate();
  // handlers
  const handleClick = (path) => {
    setShowSidebar(false);
    navigate(path);
  };
  const handleLogout = async () => {
    await cleanStates();
    logout();
    navigate("/");
  };
  return (
    <>
      {showSidebar ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-circle-x fixed left-4 top-4 z-50 duration-300 ease-in-out  hover:cursor-pointer"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#FFF"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M10 10l4 4m0 -4l-4 4" />
        </svg>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed left-8 top-8 z-50 flex items-center duration-300 ease-in-out  hover:cursor-pointer"
          fill={isDark ? "#fff" : "#000"}
          viewBox="0 0 100 80"
          width="24"
          height="24"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-64 bg-cyan-700 px-4 pt-24  duration-300 ease-in-out dark:bg-cyan-900 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-md mb-4 font-bold text-white">
          {`${informacionPersonal.nombres} ${informacionPersonal.primer_apellido} ${informacionPersonal.segundo_apellido}`}
        </h2>
        <div
          className={
            "text-md mt-4 rounded-sm px-2 transition-all " +
            "text-white hover:cursor-pointer hover:text-neutral-300"
          }
        >
          <p onClick={() => handleClick("/home")}>Realizar una predicción</p>
        </div>
        <div
          className={
            "text-md mt-4 rounded-sm px-2 transition " +
            "text-white hover:cursor-pointer hover:text-neutral-300"
          }
        >
          <p onClick={() => handleClick("/home/history")}>
            Historial de predicciones
          </p>
        </div>
        <p
          className={
            "text-md mt-4   rounded-md px-2 " +
            "text-white hover:cursor-pointer " +
            "hover:text-red-300"
          }
          onClick={() => handleLogout()}
        >
          Cerrar sesión
        </p>
      </aside>
    </>
  );
};

export default Sidebar;
