import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

const ValidateEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .post("http://localhost:8000/users/email-validate", { token })
        .then(() => {
          setData(true);
        })
        .catch((error) => {
          console.error("Error durante la validación del correo:", error);
          setError(true);
        });
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        {!error && !data && (
          <p className="text-center">
            Estamos validando tu cuenta. Por favor, espera un momento.
          </p>
        )}
        {error && !data && (
          <h1 className="text-center text-red-500">
            Ocurrió un error al validar tu correo.
          </h1>
        )}
        {data && (
          <div className="text-center">
            <h1 className="text-center text-green-500 mb-3">
              Correo verificado correctamente.
            </h1>
            <Link
              className="mt-4 text-sm bg-green-300 text-white px-4 py-2 rounded focus:outline-none hover:bg-green-400"
              to="/login"
              relative="path"
            >
              Ir a la página de inicio de sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidateEmail;
