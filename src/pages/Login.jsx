// librerias
import { Link } from "react-router-dom";
// logo
import Logo from "../img/logo.png";

const Login = () => (
  <main className="flex h-full flex-col gap-2 rounded-lg bg-white p-4 shadow-lg dark:bg-neutral-800 lg:grid lg:grid-cols-2">
    <section className="rounded-md bg-cyan-700 p-4 dark:bg-cyan-900 lg:flex lg:items-center lg:justify-center">
      <div className="mx-auto flex flex-col items-center gap-2">
        <img src={Logo} alt="logo" className="w-24 rounded-full" />
        <h1 className="text-center text-lg font-bold text-white">
          ¿Qué es HealthDiagAI?
        </h1>
        <p className="text-center text-sm text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque iste
          quidem eos nisi ratione, perspiciatis porro cupiditate, nostrum animi
          obcaecati incidunt enim architecto maiores cum quasi aperiam numquam
          eligendi!
        </p>
      </div>
    </section>
    <section className="p-4 lg:flex lg:items-center lg:justify-center">
      <div>
        <h2 className="text-md text-center dark:text-gray-200 lg:text-lg">
          Inicia sesión para predecir qué enfermedad puedes padecer
        </h2>
        <form className="flex flex-col sm:mx-auto sm:w-96 md:w-80">
          <div className="mt-4 flex flex-col">
            <label
              htmlFor="email"
              className="text-md dark:text-gray-200 lg:text-lg"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="user@email.com"
              className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
            />
          </div>
          <div className="mt-4 flex flex-col">
            <label
              htmlFor="password"
              className="text-md dark:text-gray-200 lg:text-lg"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              className="text-md w-full border-2 px-2 focus:border-blue-600 focus:outline-none dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 md:w-auto lg:text-lg"
            />
          </div>
          <input
            type="submit"
            value="Iniciar sesión"
            className="text-md mt-6 rounded-md bg-blue-700 p-2 text-white hover:cursor-pointer hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 lg:text-lg"
          />
        </form>
        <p className="mt-6 text-center text-xs dark:text-gray-200 lg:text-sm">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-600 hover:cursor-pointer dark:text-blue-400 lg:text-sm">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </section>
  </main>
);

export default Login;
