// librerias para el routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
// plantillas
import LayoutInitSession from "./layout/LayoutInitSession";
// vistas
import Login from "./pages/Login";
import Signin from "./pages/Signin";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LayoutInitSession />}>
        <Route index element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
