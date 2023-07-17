import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutInitSession from "./layout/LayoutInitSession";
import MainWrapper from "./layout/MainWrapper";
import PrivateRoute from "./layout/PrivateRoute";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import History from "./pages/History";
import LayoutMain from "./layout/LayoutMain";

const SafeApp = () => (
  <BrowserRouter>
    <MainWrapper>
      <Routes>
        {/* Rutas de inicio y registro de sesion */}
        <Route path="/" element={<LayoutInitSession />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Signin />} />
        </Route>
        {/* Rutas de la aplicacion */}
        <Route path="home" element={<LayoutMain />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </MainWrapper>
  </BrowserRouter>
);

export default SafeApp;
