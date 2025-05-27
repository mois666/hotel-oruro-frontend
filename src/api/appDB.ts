import axios from "axios";
//hola

export const appDB = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-type": "application/json"
    }   
});