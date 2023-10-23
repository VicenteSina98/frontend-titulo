import Logo from "../../img/logo.png";

const Welcome = () => (
  <div className="flex flex-col gap-6">
    <img src={Logo} alt="logo" className="mx-auto w-24 rounded-full" />
    <h1 className="text-center text-2xl font-bold dark:text-white">
      HealthDiagAI
    </h1>
    <p className="text-center text-lg dark:text-white">
      Realice, mediante el uso de la Inteligencia Artificial, una predicción de
      posibles enfermedades que pueda tener según sus antecedentes médicos,
      síntomas y otros criterios.
    </p>
    <p className="rounded-md bg-red-400 p-4 text-lg dark:bg-red-800 dark:text-white text-center">
      <span className="font-bold dark:text-white">NOTA:</span> Recuerde que esto
      es solo una predicción utilizando inteligencia artificial, lo que no
      reemplaza el diagnóstico de un profesional de la salud.
    </p>
  </div>
);

export default Welcome;
