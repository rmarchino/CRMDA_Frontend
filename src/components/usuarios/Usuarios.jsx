import React, { useContext, useEffect, useState } from "react";
import { FaFileExcel } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";
import clienteAxios from "../../config/axios";
import Spinner from "../shared/Spinner";
import DataTable from "./DataTable";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useContext(CRMContext);
  const navigate = useNavigate();

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const usuariosConsulta = await clienteAxios.get("/usuarios");
        setUsuarios(usuariosConsulta.data);
        setIsLoading(false);

      } catch (error) {
        if (error.response.status === 500) {
          navigate("/login");
        }
      }
    };
    consultarAPI();

  }, [navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl text-gray-700 font-bold">Usuarios</h1>
      </div>
      <div className="flex justify-between items-center mb-5">
        <Link
          to="/usuario/nuevo"
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
      <DataTable usuarios={usuarios} />
    </div>
  );
};

export default Usuarios;
