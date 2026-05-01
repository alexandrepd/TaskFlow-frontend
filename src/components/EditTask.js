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

    if (loading) return <div className="container mt-5">Loading task...</div>;

    return (
        <Layout errorMessage={errorMessage}>
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
                            <option value="InProgress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">
                        Save
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default EditTask;
