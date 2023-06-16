// librerias para el routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
// plantillas
import LayoutInitSession from "../layout/LayoutInitSession";
// vistas
import Login from "./Login";
import Signin from "./Signin";
import Home from "./Home";

const SafeApp = () => (
  <BrowserRouter>
    <Routes>
      {/* Rutas de inicio y registro de sesion */}
      <Route path="/" element={<LayoutInitSession />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Signin />} />
      </Route>
      {/* Rutas de la aplicacion */}
      <Route path="home">
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default SafeApp;
