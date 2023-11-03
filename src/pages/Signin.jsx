// librerias
import { useState } from "react";
// componentes
import Sentence from "../components/UI/base/Sentence";
import GoTo from "../components/UI/base/GoTo";
import BlockNotification from "../components/UI/notifications/BlockNotification";
import PersonalDataForm from "../components/outSession/signinForm/PersonalDataForm";
import MedicalDataForm from "../components/outSession/signinForm/MedicalDataForm";
import MainContainer from "../components/outSession/outSessionBase/MainContainer";
import Header from "../components/outSession/outSessionBase/Header";

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
  return (
    <MainContainer>
      <Header content="Regístrate y utiliza la aplicación" />
      <section className="h-full w-full overflow-auto px-8 py-4 xl:flex xl:flex-col xl:items-center xl:justify-center">
        <div className="flex flex-col items-center justify-center">
          {sessionError?.email?.map((error, index) => (
            <BlockNotification
              key={index}
              content={`Error en el correo: ${error}`}
              textColor="text-white"
              backgroundColor="bg-red-700"
            />
          ))}
          {sessionError?.password?.map((error, index) => (
            <BlockNotification
              key={index}
              content={`Error en la contraseña: ${error}`}
              textColor="text-white"
              backgroundColor="bg-red-700"
            />
          ))}
          {accountCreated ? (
            <BlockNotification
              content="Cuenta creada, dirígete a la página de inicio de sesión"
              textColor="text-white"
              backgroundColor="bg-green-700"
            />
          ) : null}
        </div>
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
        <Sentence
          content={
            <>
              ¿Ya tienes una cuenta?{" "}
              <GoTo content="Inicia sesión aquí" toPath="/" />
            </>
          }
        />
      </section>
    </MainContainer>
  );
};

export default Signin;
