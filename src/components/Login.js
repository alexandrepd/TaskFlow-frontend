import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await api.post("/auth/login", { username, password });
            login(response.data.token);
            navigate("/tasks");
        } catch (error) {
            const message = error.response?.data?.message || "Ocorreu um erro ao tentar fazer login. Verifique suas credenciais e tente novamente.";
            setErrorMessage(message);
        }
    };

    return (
        <Layout errorMessage={errorMessage}>
            <div className="max-h-screen flex items-center justify-center bg-gray-100 p-8">
                <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-lg">
                    <form className="mt-6 w-full text-center" onSubmit={handleSubmit}>
                        <div className="w-full">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuário</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4 w-full">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 mt-6 rounded-lg hover:bg-blue-600 transition"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;