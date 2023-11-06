// librerias
import { useState } from "react";
// componentes
import { Sentence, GoTo } from "../components/UI/base";
import {
  PersonalDataForm,
  MedicalDataForm,
} from "../components/outSession/signinForm";
import { Header, MainContainer } from "../components/outSession/outSessionBase";

export const Signin = () => {
  // estados
  const [password, setPassword] = useState("");
  const [nextSection, setNextSection] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [sessionError, setSessionError] = useState({
    email: [],
    password: [],
  });
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
        {nextSection ? (
          <MedicalDataForm
            informacionPersonal={informacionPersonal}
            password={password}
            antecedentesMedicos={antecedentesMedicos}
            sessionError={sessionError}
            accountCreated={accountCreated}
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
            accountCreated={accountCreated}
            sessionError={sessionError}
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
