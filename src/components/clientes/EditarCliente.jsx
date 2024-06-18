import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";

const EditarCliente = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);

  const [cliente, setCliente] = useState({
    id: "",
    nombre: "",
    documento: "",
    email: "",
    direccion: "",
    telefono: "",
  });

  const [creador, setCreador] = useState(null);

  //Consultar API
  const consultarAPI = async () => {
    try {
      const clienteConsulta = await clienteAxios.get(`/clientes/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      const clienteData = clienteConsulta.data;

      //Extraer datos del servicio y del creador
      const { Usuario, ...clienteRestante } = clienteData;

      //Actualizar el estado del cliente y del usuario
      setCliente(clienteRestante);
      setCreador(Usuario);

    } catch (error) {
      console.error("Error al consultar el servicio:", error);
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  //Leer los datos del formulario
  const actualizarState = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  //Editar un cliente en la BD
  const actualizarCliente = async (e) => {
    e.preventDefault();

    clienteAxios
      .put(`/clientes/${cliente.id}`, cliente, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then((res) => {
        Swal.fire("Correcto", "Se actualizó correctamente", "success");
        navigate("/clientes");
      })
      .catch((error) => {
        if (error.response) {
          const errorMessage = error.response.data.error || "Hubo un error al actualizar el cliente";
          Swal.fire({
            type: "error",
            title: "Error",
            text: errorMessage,
          });
        }else {
          Swal.fire({
            type: "error",
            title: "Error",
            text: "Error al configurar la solicitud",
          });
        }
      });
  };

  //Validar formulario
  const validarCliente = () => {
    const {nombre, documento, email, direccion, telefono} = cliente;

    let valido =
      !nombre.length ||
      !documento.length ||
      !email.length ||
      !direccion.length ||
      !telefono.length

      return valido;
  };
  

  // Estado para mantener las fechas formateadas
  const {createdAt, updatedAt} = cliente;
  const [formattedCreatedAt, setFormattedCreatedAt] = useState('');
  const [formattedUpdatedAt, setFormattedUpdatedAt] = useState('');

  const formatearFecha = (date) => {
    return format(new Date(date), "dd/MM/yyyy HH:mm");
  }

  useEffect(() => {
    if (createdAt) {
      setFormattedCreatedAt(formatearFecha(createdAt));
    }
    if (updatedAt) {
      setFormattedUpdatedAt(formatearFecha(updatedAt));
    }
  }, [createdAt, updatedAt]);



  return (
    <div className="container mx-auto">
      <h2 className="text-center text-2xl font-semibold">Editar cliente</h2>

      <form
        onSubmit={actualizarCliente}
        className="mt-3 border p-6 mx-auto rounded bg-white shadow-sm"
        style={{ maxWidth: "600px" }}
      >
        {creador && (
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-4">
              <div className="form-group">
                <label htmlFor="usuario" className="block text-gray-700 mb-2">
                  Creado por:
                </label>
                <input
                  type="text"
                  disabled
                  id="usuario"
                  value={creador.nombre}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-4">
            <div className="form-group">
              <label htmlFor="nombre" className="block text-gray-700 mb-2">
                Cliente
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={cliente.nombre}
                onChange={actualizarState}
                placeholder="Ingrese el nombre"
                className="form-control bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-4">
            <div className="form-group">
              <label htmlFor="email" className="text-gray-700 mb-2">
                Correo
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={cliente.email}
                onChange={actualizarState}
                placeholder="Ingrese el email"
                className="form-control bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-4">
            <div className="form-group">
              <label htmlFor="documento" className="text-gray-700">
                RUC
              </label>
              <input
                type="text"
                id="documento"
                name="documento"
                value={cliente.documento}
                onChange={actualizarState}
                placeholder="Ingrese el RUC"
                className="form-control bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 w-full"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4">
            <div className="form-group">
              <label htmlFor="telefono" className="text-gray-700">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={cliente.telefono}
                onChange={actualizarState}
                placeholder="Ingrese el Teléfono"
                className="form-control bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-4">
            <div className="form-group">
              <label htmlFor="direccion" className="text-gray-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={cliente.direccion}
                onChange={actualizarState}
                placeholder="Ingrese el dirección"
                className="form-control bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-4">
            <div className="form-group">
              <label htmlFor="fechaCreada" className="block text-gray-700">
                Fecha Creada
              </label>
              <input
                type="text"
                id="fechaCreada"
                name="fechaCreada"
                value={formattedCreatedAt}
                readOnly
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4">
            <div className="form-group">
              <label htmlFor="fechaActualizada" className="block text-gray-700">
                Fecha Actualizada
              </label>
              <input
                type="text"
                id="fechaActualizada"
                name="fechaActualizada"
                value={formattedUpdatedAt}
                readOnly
                className="appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-3">
          <input
            type="submit"
            value="Guardar cambios"
            disabled={validarCliente()}
            className=" bg-green-500 hover:bg-green-700 text-white p-3 rounded-md mr-2 cursor-pointer"
          />
          <Link
            to={"/clientes"}
            className="btn bg-red-500 hover:bg-red-700 text-white p-3 rounded-md cursor-pointer"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditarCliente;
