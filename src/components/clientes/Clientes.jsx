import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IoPersonAddSharp } from "react-icons/io5";
import { FaFileExcel } from "react-icons/fa6";

import DataTable from "./DataTable";
import clienteAxios from "../../config/axios";
import Spinner from "../shared/Spinner";
import { CRMContext } from "../../context/CRMContext";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useContext(CRMContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.auth) {
      const consultarAPI = async () => {
        try {
          const clientesConsulta = await clienteAxios.get("/clientes", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setClientes(clientesConsulta.data);
          setIsLoading(false);

        } catch (error) {
          if ((error.response.status === 500)) {
            navigate("/login");
          }
        }
      };
      consultarAPI();

    } else {
      navigate("/login");
    }
  }, [auth, navigate]);

  //Spinner
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl text-gray-700 font-bold">Clientes</h1>
      </div>
      <div className="flex justify-between items-center mb-5">
        <Link
          to="/clientes/nuevo"
          className="bg-blue-500 text-white p-3 rounded cursor-pointer hover:bg-blue-600"
        >
          <IoPersonAddSharp />
        </Link>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            className="border rounded p-2"
            placeholder="Fecha inicio"
          />
          <input
            type="date"
            className="border rounded p-2"
            placeholder="Fecha fin"
          />
          <button className="bg-green-500 text-white p-3 rounded cursor-pointer">
            <FaFileExcel />
          </button>
        </div>
      </div>

      {/* Table */}
      <DataTable clientes={clientes} />
    </div>
  );
};

export default Clientes;
