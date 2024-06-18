import "./datatable.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import $ from "jquery";
import "datatables.net-dt";
import { format } from "date-fns";

import { MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const DataTable = ({ usuarios }) => {
  const { id } = usuarios;

  useEffect(() => {
    if ($.fn.DataTable.isDataTable("#tablaUsuarios")) {
      $("#tablaUsuarios").DataTable().destroy();
    }

    $("#tablaUsuarios").DataTable({
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
  }, [usuarios]);

  //elimina un cliente
  const eliminarCliente = (idUsuario) => {
    Swal.fire({
      title: "¿Estás segruo?",
      text: "Un usuario eliminado no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios.delete(`/usuarios/${idUsuario}`).then((res) => {
          Swal.fire("Eliminado", res.data.message, "success");
        });
      }
    });
  };

  return (
    <div className="flex flex-wrap">
      <div className=" overflow-x-auto">
        <table id="tablaUsuarios" className="table-auto w-full">
          <thead className="table-header-color">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Email Validado</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Imagen Usuario</th>
              <th className="px-4 py-2">Fecha Creada</th>
              <th className="px-4 py-2">Fecha Actualizada</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="border px-4 py-2">{usuario.id}</td>
                <td className="border px-4 py-2">{usuario.nombre}</td>
                <td className="border px-4 py-2">{usuario.apellido}</td>
                <td className="border px-4 py-2">{usuario.email}</td>
                <td className="border px-4 py-2">{usuario.validEmail}</td>
                <td className="border px-4 py-2">{usuario.typeRol}</td>
                <td className="border px-4 py-2">
                  {usuario.avatar ? (
                    <img
                      src={`http://localhost:9000/${usuario.avatar}`}
                      alt={usuario.nombre}
                      className="w-20 h-20 object-cover"
                    />
                  ) : null}
                </td>
                <td className="border px-4 py-2">
                  {format(new Date(usuario.createdAt), "dd/MM/yyyy")}
                </td>
                <td className="border px-4 py-2">
                  {format(new Date(usuario.updatedAt), "dd/MM/yyyy")}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex items-center">
                    <Link
                      to={`/usuario/editar/${usuario.id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-l-lg"
                    >
                      <MdEdit className="text-3xl font-bold" />
                    </Link>

                    <button
                      className="bg-red-500 hover:bg-red-700 text-white  p-2 rounded-r-lg"
                      onClick={() => eliminarCliente(id)}
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
