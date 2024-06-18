import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/shared/Layout";

import Dashboard from "./components/dashboard/Dashboard";

import ValidateEmail from "./components/email/ValidateEmail";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

import Clientes from "./components/clientes/Clientes";
import EditarCliente from "./components/clientes/EditarCliente";
import NuevoCliente from "./components/clientes/NuevoCliente";

import Servicios from "./components/servicios/Servicios";
import CrearServicio from "./components/servicios/CrearServicio";
import EditarServicio from "./components/servicios/EditarServicio";

import Experiencias from "./components/experiencias/Experiencias";
import CrearExperiencia from "./components/experiencias/CrearExperiencia";
import EditarExperiencia from "./components/experiencias/EditarExperiencia";

import Usuarios from "./components/usuarios/Usuarios";
import CrearUsuario from "./components/usuarios/CrearUsuario";
import EditarUsuario from "./components/usuarios/EditarUsuario";

import Mensajes from "./components/mensajes/Mensajes";
import { CRMContext, CRMProvider } from "./context/CRMContext";

export default function App() {
  const [auth, setAuth] = useContext(CRMContext);

  return (
    <Router>
      <>
        <CRMProvider value={[auth, setAuth]}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />

              <Route path="/clientes" element={<Clientes />} />
              <Route path="/clientes/nuevo" element={<NuevoCliente />} />
              <Route path="/clientes/editar/:id" element={<EditarCliente />} />

              <Route path="/servicios" element={<Servicios />} />
              <Route path="/servicios/nuevo" element={<CrearServicio />} />
              <Route path="/servicios/editar/:id" element={<EditarServicio />} />

              <Route path="/experiencias" element={<Experiencias />} />
              <Route path="/experiecia/nuevo" element={<CrearExperiencia />} />
              <Route path="/experiecia/editar/:id" element={<EditarExperiencia />} />

              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/usuario/nuevo" element={<CrearUsuario />} />
              <Route path="/usuario/editar/:id" element={<EditarUsuario />} />

              <Route path="/messages" element={<Mensajes />} />
            </Route>
          </Routes>
        </CRMProvider>
        <Routes>
          <Route path="/email-validate" element={<ValidateEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </>
    </Router>
  );
}
