import { Link } from "react-router-dom";
import PersonalDataForm from "../components/signinForm/PersonalDataForm";
import Logo from "../img/logo.png";
import MedicalDataForm from "../components/signinForm/MedicalDataForm";
import { useState } from "react";
import Success from "../components/Success";

const Signin = () => {
  const [password, setPassword] = useState("");
  const [nextSection, setNextSection] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  return (
    <main className="flex h-full flex-col gap-4 rounded-lg bg-white p-1 shadow-lg dark:bg-neutral-800">
      <section className="flex flex-col items-center justify-center gap-2">
        <img src={Logo} alt="logo" className="w-24 rounded-full" />
        <h1 className="text-2xl font-bold text-black dark:text-gray-200">
          HealthDiagAI
        </h1>
      </section>
      <h2 className="text-center text-lg text-black dark:text-gray-200">
        Regístrate y obtén predicciones de enfermedades
      </h2>
      <section className="overflow-y-auto p-4">
        <div>
          {accountCreated ? (
            <Success
              message={
                "Cuenta creada, dirígete a la página de inicio de sesión"
              }
            />
          ) : null}
        </div>
        {nextSection ? (
          <MedicalDataForm
            setNextSection={setNextSection}
            setAccountCreated={setAccountCreated}
            password={password}
          />
        ) : (
          <PersonalDataForm
            setNextSection={setNextSection}
            setPassword={setPassword}
          />
        )}
      </section>
      <p className="mt-6 text-center text-xs dark:text-gray-200 lg:text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to="/"
          className="text-blue-600 hover:cursor-pointer dark:text-blue-400 lg:text-sm"
        >
          Inicia sesión aquí
        </Link>
      </p>
    </main>
  );
};

export default Signin;
