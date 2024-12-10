import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: "",
        description: "",
        category: "",
        priority: "",
        status: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await api.get(`/tasks/${id}`);
                setTask(response.data);
            } catch (error) {
                console.error("Error fetching task:", error);
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
            await api.put(`/tasks/${id}`, task);
            navigate("/tasks"); // Voltar para a lista após a atualização
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    if (loading) return <div className="container mt-5">Loading task...</div>;

    return (
        <div className="container mt-5">
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={task.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                        type="text"
                        name="category"
                        className="form-control"
                        value={task.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select
                        name="priority"
                        className="form-select"
                        value={task.priority}
                        onChange={handleChange}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        name="status"
                        className="form-select"
                        value={task.status}
                        onChange={handleChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success">
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditTask;
