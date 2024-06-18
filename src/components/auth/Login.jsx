import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { CRMContext } from "../../context/CRMContext";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const Login = () => {
  
  const [auth, setAuth] = useContext(CRMContext);
  const [credenciales, setCredenciales] = useState({});
  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await clienteAxios.post("/iniciar-sesion", credenciales);

      //Extraer el TOKEN y colocar en localstorage
      const { token } = respuesta.data;
      localStorage.setItem("token", token);
      localStorage.setItem("auth", true);

      //colocar en el state
      setAuth({
        token,
        auth: true,
      });

      Swal.fire("Login Correcto", "Has iniciado Sesión", "success");
      navigate("/clientes");

    } catch (error) {
      if (error.response) {
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: "Hubo un error",
        });
      }
    }
  };

  //Almacenar en state lo que escribe el usuario
  const leerDatos = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white px-10 py-10 rounded-3xl shadow-xl border">
        <form onSubmit={iniciarSesion}>
          <h1 className="text-3xl font-semibold text-center text-gray-500">
            ¡Bienvenido de nuevo!
          </h1>
          <div className="mt-8">
            <label
              className="text-lg font-medium text-gray-500 cursor-pointer"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={leerDatos}
              placeholder="Ingrese su email"
              className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent"
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-500 cursor-pointer"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={leerDatos}
              placeholder="Ingrese su password"
              className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent"
            />
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
            <input
              type="submit"
              value="Iniciar Sesión"
              className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-indigo-500 text-white text-lg font-bold"
            />
            
            <button
              type="submit"
              className="flex rounded-xl py-3 border-2 border-gray-200 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer"
            >
              <FcGoogle />
              <p>Iniciar sesion con Google</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
