import axios from "axios";

const clienteAxios = axios.create({
    baseURL: "https://da-backend-6fei.onrender.com"
});

export default clienteAxios;
