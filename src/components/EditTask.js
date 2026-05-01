import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Layout from "./Layout";

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [task, setTask] = useState({
        id: "",
        title: "",
        description: "",
        category: "",
        priority: "Low",
        status: "Pending",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await api.get(`/tasks/${id}`);
                setTask(response.data);
            } catch (error) {
                setErrorMessage("Error fetching task");
                navigate("/tasks"); // Voltar para a lista se a tarefa não for encontrada
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/tasks/${id}`, {
                id,
                title: task.title,
                description: task.description,
                category: task.category,
                priority: task.priority,
                status: task.status,
            });
            navigate("/tasks");
        } catch (error) {
            const message = error.response?.data?.message || "Error updating task";
            setErrorMessage(message);
        }
    };

    if (loading) return (
        <Layout>
            <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
        </Layout>
    );

    return (
        <Layout>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => navigate('/tasks')} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Editar tarefa</h1>
                        <p className="text-sm text-slate-500 mt-0.5">Atualize os detalhes da tarefa</p>
                    </div>
                </div>

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                        {errorMessage}
                    </div>
                )}

                <div className="card p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Título <span className="text-red-500">*</span></label>
                            <input type="text" name="title" className="input-field" value={task.title} onChange={handleChange} required />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                            <textarea name="description" rows={3} className="input-field resize-none" value={task.description} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                            <input type="text" name="category" className="input-field" value={task.category} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Prioridade</label>
                            <select name="priority" className="input-field" value={task.priority} onChange={handleChange}>
                                <option value="Low">Baixa</option>
                                <option value="Medium">Média</option>
                                <option value="High">Alta</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select name="status" className="input-field" value={task.status} onChange={handleChange}>
                                <option value="Pending">Pendente</option>
                                <option value="InProgress">Em andamento</option>
                                <option value="Completed">Concluída</option>
                                <option value="Cancelled">Cancelada</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2 flex justify-end gap-3 pt-2 border-t border-slate-100">
                            <button type="button" className="btn-secondary" onClick={() => navigate('/tasks')}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn-primary">
                                Salvar alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default EditTask;
