import "./datatable.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import $ from "jquery";
import "datatables.net-dt";
import { format } from "date-fns";

import { MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const DataTable = ({ servicios }) => {

  const { id } = servicios;

  useEffect(() => {
    if ($.fn.DataTable.isDataTable("#tabla1")) {
      $("#tabla1").DataTable().destroy();
    }

    $("#tabla1").DataTable({
      language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "No se encontraron resultados",
        info: "Mostrando registros del _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 a 0 de 0 registros",
        infoFiltered: "(filtrado de _MAX_ registros totales)",
        search: "Buscar:",
        paginate: {
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior",
        },
      },
    });
  }, [servicios]);

  //elimina un servicio
  const eliminarServicio = (idServicio) => {
    Swal.fire({
      title: "¿Estás segruo?",
      text: "Un servicio eliminado no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios.delete(`/servicios/${idServicio}`).then((res) => {
          Swal.fire("Eliminado", res.data.message, "success");
        });
      }
    });
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full overflow-x-auto">
        <table id="tabla1" className="table-auto w-full">
          <thead className="table-header-color">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Servicio</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Creado por</th>
              <th className="px-4 py-2">Fecha creada</th>
              <th className="px-4 py-2">Fecha Actualizada</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {servicios.map((servicio) => (
              <tr key={servicio.id}>
                <td className="border px-4 py-2">{servicio.id}</td>
                <td className="border px-4 py-2">{servicio.nombre}</td>
                <td className="border px-4 py-2">
                  {servicio.imagen ? (
                    <img
                      src={`http://localhost:9000/${servicio.imagen}`}
                      alt={servicio.nombre}
                      className="w-20 h-20 object-cover"
                    />
                  ) : null}
                </td>
                <td className="border px-4 py-2">${servicio.precio}</td>
                <td className="border px-4 py-2">{servicio.descripcion}</td>
                <td className="border px-4 py-2">{servicio.Usuario.nombre}</td>
                <td className="border px-4 py-2">
                  {format(new Date(servicio.createdAt), "dd/MM/yyyy")}
                </td>
                <td className="border px-4 py-2">
                  {format(new Date(servicio.updatedAt), "dd/MM/yyyy")}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex items-center">
                    <Link
                      to={`/servicios/editar/${servicio.id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-l-lg"
                    >
                      <MdEdit className="text-3xl font-bold" />
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white  p-2 rounded-r-lg"
                      onClick={() => eliminarServicio(id)}
                    >
                      <MdDelete className="text-3xl font-bold" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
