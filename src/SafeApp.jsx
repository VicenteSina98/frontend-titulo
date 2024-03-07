// librerias
import { BrowserRouter, Routes, Route } from "react-router-dom";
// layouts
import {
  LayoutInitSession,
  MainWrapper,
  PrivateRoute,
  LayoutMain,
} from "./layout/layout";
// paginas
import { Login, Signin, Home, History } from "./pages/Pages";
// componentes
import PredictionUI from "./components/prediction/PredictionUI";

const SafeApp = () => (
  <BrowserRouter>
    <MainWrapper>
      <Routes>
        {/* Rutas de inicio y registro de sesion */}
        <Route path="/" element={<LayoutInitSession />}>
          <Route index element={<Login />} />
          <Route path="registro" element={<Signin />} />
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
          <Route
            path="prediction"
            element={
              <PrivateRoute>
                <PredictionUI />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </MainWrapper>
  </BrowserRouter>
);

export default SafeApp;
