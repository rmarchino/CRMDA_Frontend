import "./toogleSwitch.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import Spinner from "../shared/Spinner";

const EditarServicio = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [servicio, setServicio] = useState({
    id: "",
    nombre: "",
    precio: "",
    imagen: "",
    descripcion: "",
    descripcionDetalle: "",
    disponible: true,
  });

  const [creador, setCreador] = useState(null);
  const [archivo, guardarArchivo] = useState("");

  // Consultar API
  const consultarAPI = async () => {
    try {
      const servicioConsulta = await clienteAxios.get(`/servicios/${id}`);
      const servicioData = servicioConsulta.data;

      //Asegurar que los valores no sean nulos
      setServicio({
        nombre: servicioData.nombre || "",
        precio: servicioData.precio || "",
        imagen: servicioData.imagen || "",
        descripcion: servicioData.descripcion || "",
        descripcionDetalle: servicioData.descripcionDetalle || "",
        disponible:
          servicioData.disponible !== undefined
            ? servicioData.disponible
            : true,
      });

      // Extraer datos del servicio y del creador
      const { Usuario, ...servicioRestante } = servicioData;

      // Actualizar el estado del servicio y del usuario creador
      setServicio(servicioRestante);
      setCreador(Usuario);
    } catch (error) {
      console.error("Error al consultar el servicio:", error);
    }
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  // Editar un servicio en la BD
  const editarServicio = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", servicio.nombre);
    formData.append("precio", servicio.precio);
    formData.append("descripcion", servicio.descripcion);
    formData.append("descripcionDetalle", servicio.descripcionDetalle);
    formData.append("disponible", servicio.disponible);

    if (archivo) {
      formData.append("imagen", archivo);
    }

    try {
      const res = await clienteAxios.put(`/servicios/${id}`, formData);
      if (res.status === 200) {
        Swal.fire("Editado correctamente", res.data.message, "success");
        navigate("/servicios");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Vuelve a intentarlo",
      });
    }
  };

  // Leer los datos del formulario
  const leerInformacionServicio = (e) => {
    const { name, value, type, checked } = e.target;
    setServicio({
      ...servicio,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Colocar la imagen en el estado
  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  // Extraer los valores del estado
  const {
    nombre,
    precio,
    imagen,
    descripcion,
    descripcionDetalle,
    disponible,
  } = servicio;

  if (!nombre && !precio && !descripcion && !descripcionDetalle) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-center text-2xl font-semibold">Editar Servicio</h2>
      <form
        onSubmit={editarServicio}
        className="mt-3 border p-6 mx-auto rounded bg-white shadow-sm"
        style={{ maxWidth: "600px" }}
      >
        {creador && (
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3 mb-4">
              <div className="form-group">
                <label className="block text-gray-700 mb-2">
                  Creado por:
                </label>
                <input
                  type="text"
                  value={creador.nombre}
                  disabled
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-4">
            <div className="form-group">
              <label htmlFor="nombre" className="text-gray-700">
                Servicio
              </label>
              <input
                type="text"
                className="form-control bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 w-full"
                placeholder="Ingrese nombre del servicio"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={leerInformacionServicio}
                required
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 px-3 mb-4">
            <div className="form-group">
              <label htmlFor="precio" className="text-gray-700">
                Precio
              </label>
              <input
                type="text"
                className="form-control bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 w-full"
                placeholder="Ingrese el precio"
                id="precio"
                name="precio"
                value={precio}
                onChange={leerInformacionServicio}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-4">
            <div className="form-group">
              <label htmlFor="imagen" className="text-gray-700">
                Imagen
              </label>
              {imagen ? (
                <img
                  src={`http://localhost:8000/${imagen}`}
                  alt={imagen}
                  width={200}
                />
              ) : null}
              <input
                type="file"
                className="form-control bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 w-full"
                name="imagen"
                onChange={leerArchivo}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-4">
            <div className="form-group">
              <label htmlFor="descripcion" className="text-gray-700">
                Descripción
              </label>
              <textarea
                className="form-control bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 w-full"
                placeholder="Ingrese descripción general"
                id="descripcion"
                name="descripcion"
                value={descripcion}
                onChange={leerInformacionServicio}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-4">
            <div className="form-group">
              <label htmlFor="descripcionDetalle" className="text-gray-700">
                Descripción Detalle
              </label>
              <textarea
                className="form-control bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 w-full"
                placeholder="Ingrese descripción detallada"
                id="descripcionDetalle"
                name="descripcionDetalle"
                value={descripcionDetalle}
                onChange={leerInformacionServicio}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <div className="form-group">
              <label
                htmlFor="disponible"
                className="flex items-center cursor-pointer"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="disponible"
                    name="disponible"
                    className="sr-only"
                    checked={disponible}
                    onChange={leerInformacionServicio}
                  />
                  <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                  <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                </div>
                <span className="ml-3 text-gray-700">Disponibilidad</span>
              </label>
            </div>
          </div>
        </div>

        {/**Botones de acciones */}
        <div className="flex justify-center">
          <input
            type="submit"
            value="Guardar"
            className="btn bg-green-500 hover:bg-green-700 text-white p-3 rounded-md mr-2 cursor-pointer"
          />

          <Link
            to="/servicios"
            className="btn bg-red-500 hover:bg-red-700 text-white p-3 rounded-md cursor-pointer"
          >
            <MdCancel className="text-2xl" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditarServicio;
