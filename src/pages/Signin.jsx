// librerias
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// componentes
import Success from "../components/Success";
import PersonalDataForm from "../components/signinForm/PersonalDataForm";
import MedicalDataForm from "../components/signinForm/MedicalDataForm";
import BlockError from "../components/error/BlockError";
import Logo from "../img/logo.png";

const Signin = () => {
  // estados
  const [password, setPassword] = useState("");
  const [nextSection, setNextSection] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [sessionError, setSessionError] = useState({});
  const [informacionPersonal, setInformacionPersonal] = useState({
    email: "",
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    fechaNacimiento: "",
    altura: "",
    peso: "",
    sexo: "",
  });
  const [antecedentesMedicos, setAntecedentesMedicos] = useState({
    enfermedadesCronicas: "",
    historialAlergias: "",
    historialCirugias: "",
    historialMedicamentos: "",
    historialEnfermedadesFamilia: "",
    historialEnfermedadesInfecciosas: "",
    historialHabitosSalud: "",
  });
  // hooks
  const navigate = useNavigate();
  // handlers
  const cleanStates = async () => {
    setPassword("");
    setNextSection("");
    setAccountCreated(false);
    setSessionError(false);
    setInformacionPersonal({});
    setAntecedentesMedicos({});
  };
  const handleClick = async () => {
    await cleanStates();
    navigate("/");
  };
  return (
    <main className="flex h-full flex-col gap-4 rounded-lg bg-white p-1 shadow-lg dark:bg-neutral-800">
      <section className="flex flex-col items-center justify-center gap-1">
        <img src={Logo} alt="logo" className="w-24 rounded-full" />
        <h1 className="text-xl font-bold text-black dark:text-gray-200">
          HealthDiagAI
        </h1>
        <h2 className="text-center text-sm text-black dark:text-gray-200">
          Regístrate y obtén predicciones de enfermedades
        </h2>
        {/* mensajes de error y exito */}
        <div>
          {sessionError?.email?.map((error, index) => (
            <BlockError key={index} message={`Error en el correo: ${error}`} />
          ))}
          {sessionError?.password?.map((error, index) => (
            <BlockError
              key={index}
              message={`Error en la contraseña: ${error}`}
            />
          ))}
          {accountCreated ? (
            <Success
              message={
                "Cuenta creada, dirígete a la página de inicio de sesión"
              }
            />
          ) : null}
        </div>
      </section>
      <section className="overflow-auto">
        {nextSection ? (
          <MedicalDataForm
            informacionPersonal={informacionPersonal}
            password={password}
            antecedentesMedicos={antecedentesMedicos}
            sessionError={sessionError}
            setInformacionPersonal={setInformacionPersonal}
            setPassword={setPassword}
            setAntecedentesMedicos={setAntecedentesMedicos}
            setSessionError={setSessionError}
            setNextSection={setNextSection}
            setAccountCreated={setAccountCreated}
          />
        ) : (
          <PersonalDataForm
            informacionPersonal={informacionPersonal}
            setNextSection={setNextSection}
            setPassword={setPassword}
            setInformacionPersonal={setInformacionPersonal}
          />
        )}
      </section>
      <p className="text-center text-xs dark:text-gray-200 lg:text-sm">
        ¿Ya tienes una cuenta?{" "}
        <span
          onClick={() => handleClick()}
          className="text-blue-600 hover:cursor-pointer dark:text-blue-400 lg:text-sm"
        >
          Inicia sesión aquí
        </span>
      </p>
    </main>
  );
};

export default Signin;
