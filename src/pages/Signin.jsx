import { useState } from "react";
import PersonalDataForm from "../components/PersonalDataForm";
import Logo from "../img/logo.png";

const Signin = () => {
  // TODO: componente de antecedentes medicos y crear cuenta
  const [nextSection, setNextSection] = useState(false);
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
        {!nextSection ? (
          <PersonalDataForm setNextSection={setNextSection} />
        ) : null}
      </section>
    </main>
  );
};

export default Signin;
