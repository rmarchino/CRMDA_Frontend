import axios from "axios";

const clienteAxios = axios.create({
    //baseURL: "http://localhost:8000"
    baseURL: "https://da-backend-6fei.onrender.com"
});

export default clienteAxios;