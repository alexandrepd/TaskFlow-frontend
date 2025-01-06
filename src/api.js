import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");

    if (token)
        config.headers.Authorization = `Bearer ${token}`;

    console.log(config);
    return config;
}
);

export default api;