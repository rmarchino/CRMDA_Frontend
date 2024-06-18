import "./datatable.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import $ from "jquery";
import "datatables.net-dt";
import { format } from "date-fns";

import { MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

const DataTable = ({ clientes }) => {
  const { id } = clientes;

  useEffect(() => {
    if ($.fn.DataTable.isDataTable("#tablaCliente")) {
      $("#tablaCliente").DataTable().destroy();
    }

    $("#tablaCliente").DataTable({
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
  }, [clientes]);

  //elimina un cliente
  const eliminarCliente = (idCliente) => {
    Swal.fire({
      title: "¿Estás segruo?",
      text: "Un cliente eliminado no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios.delete(`/clientes/${idCliente}`).then((res) => {
          Swal.fire("Eliminado", res.data.message, "success");
        });
      }
    });
  };

  return (
    <div className="flex flex-wrap">
      <div className=" overflow-x-auto">
        <table id="tablaCliente" className="table-auto w-full">
          <thead className="table-header-color">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre Cliente</th>
              <th className="px-4 py-2">Ruc</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Dirección</th>
              {/* <th className="px-4 py-2">Creado por</th> */}
              <th className="px-4 py-2">Fecha Creada</th>
              <th className="px-4 py-2">Fecha Actualizada</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td className="border px-4 py-2">{cliente.id}</td>
                <td className="border px-4 py-2">{cliente.nombre}</td>
                <td className="border px-4 py-2">{cliente.documento}</td>
                <td className="border px-4 py-2">{cliente.email}</td>
                <td className="border px-4 py-2">{cliente.telefono}</td>
                <td className="border px-4 py-2">{cliente.direccion}</td>
                {/* <td className="border px-4 py-2">{cliente.Usuario.nombre}</td> */}
                <td className="border px-4 py-2">
                  {format(new Date(cliente.createdAt), "dd/MM/yyyy")}
                </td>
                <td className="border px-4 py-2">
                  {format(new Date(cliente.updatedAt), "dd/MM/yyyy")}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex items-center">
                    <Link
                      to={`/clientes/editar/${cliente.id}`}
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
