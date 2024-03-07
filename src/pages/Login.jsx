// librerias
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// funciones auxiliares
import { useAuthStore } from "../store/Auth";
import { login } from "../helpers/auth";
// componentes
import { Subtitle, Sentence, Label, Input, GoTo } from "../components/UI/base";
import { PrimaryButton } from "../components/UI/buttons";
import { BlockNotification } from "../components/UI/notifications";
import {
  Header,
  MainContainer,
  FormContainer,
  FieldContainer,
} from "../components/outSession/outSessionBase";

export const Login = () => {
  // estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionError, setSessionError] = useState("");
  // hooks
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  // handlers
  const cleanStates = async () => {
    setEmail("");
    setPassword("");
    setSessionError("");
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    const { error } = await login(email, password);
    if (!error) {
      await cleanStates();
      navigate("/home");
    } else setSessionError(error);
  };
  // effects
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/home");
    }
  }, []);
  return (
    <MainContainer>
      <Header
        content="HealthDiagAI es una aplicación impulsada por inteligencia artificial
            que ofrece diagnóstico de enfermedades. Utiliza algoritmos avanzados
            para analizar datos médicos y síntomas. Permite ingresar información
            relevante y brinda recomendaciones preliminares. No reemplaza la
            opinión de un profesional médico, pero es una herramienta
            complementaria. Permite un acceso rápido y confiable a diagnósticos.
            Facilita la toma de decisiones informada y la atención médica
            eficiente"
      />
      <section className="h-full w-full overflow-y-auto px-16 lg:w-7/12 xl:flex xl:w-6/12 xl:flex-col xl:items-center xl:justify-center xl:px-20">
        <FormContainer>
          <Subtitle
            content="Inicia sesión  y utiliza la aplicación"
            textWeight="font-bold"
          />
          {sessionError ? (
            <BlockNotification
              content={sessionError}
              typeNotification="error"
            />
          ) : null}
          <form className="flex w-full flex-col gap-6" onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
              <FieldContainer>
                <Label
                  forInput="email"
                  content="Correo Electrónico"
                  required={false}
                />
                <Input
                  typeInput="email"
                  nameInput="email"
                  idInput="email"
                  placeholderInput="Ej: usuario@email.com"
                  valueInput={email}
                  onChangeFn={setEmail}
                />
              </FieldContainer>
              <FieldContainer>
                <Label
                  forInput="password"
                  content="Contraseña"
                  required={false}
                />
                <Input
                  typeInput="password"
                  nameInput="password"
                  idInput="password"
                  placeholderInput="********"
                  valueInput={password}
                  onChangeFn={setPassword}
                />
              </FieldContainer>
            </div>
            <PrimaryButton
              valueButton="Iniciar sesión"
              textColor="text-white"
            />
          </form>
          <Sentence
            content={
              <>
                ¿No tienes una cuenta?{" "}
                <GoTo content="Regístrate aquí" toPath="/registro" />
              </>
            }
          />
        </FormContainer>
      </section>
    </MainContainer>
  );
};

export default Login;
