import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";


const NuevoCliente = () => { 
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    id: "",
    nombre: "",
    documento: "",
    email: "",
    direccion: "",
    telefono: "",
  });

  //Leer los datos
  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  // Añade en el REST API un nuevo cliente
  const handleSubmit = (e) => {
    e.preventDefault();

    clienteAxios
      .post("/clientes", cliente)
      .then((res) => {
        Swal.fire("Se agregó el cliente", res.data.message, "success");
        navigate("/clientes");
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data.error.message;
          Swal.fire({
            type: "error",
            title: "Hubo un error",
            text: errorMessage,
          });
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor.");
        } else {
          console.error("Error al configurar la solicitud:", error.message);
        }
      });
  };

  //Validar formulario
  const validarCliente = () => {
    const {nombre, documento, email, direccion, telefono} = cliente;

    return (
      !nombre.length ||
      !documento.length ||
      !email.length ||
      !direccion.length ||
      !telefono.length
    );
  };



  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl text-gray-700 font-semibold mb-4">
        Agregar Nuevo Cliente
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mt-2 border p-4 mx-auto rounded bg-white shadow-sm"
        style={{ maxWidth: "600px" }}
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-gray-700 font-medium mb-1"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={cliente.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded bg-gray-50 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="documento"
              className="block text-gray-700 font-medium mb-1"
            >
              RUC
            </label>
            <input
              type="text"
              id="documento"
              name="documento"
              required
              value={cliente.documento}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded bg-gray-50 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={cliente.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded bg-gray-50 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="telefono"
              className="block text-gray-700 font-medium mb-1"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              required
              value={cliente.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded bg-gray-50 text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="direccion"
              className="block text-gray-700 font-medium mb-1"
            >
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              required
              value={cliente.direccion}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded bg-gray-50 text-gray-900"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center space-x-4">
          <input
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
          <Link to="/clientes">
            <input
              type="button"
              value="Cancelar"
              className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
            />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NuevoCliente;
