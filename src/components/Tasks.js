import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Layout from "./Layout";


const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const { auth } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(""); // Estado para armazenar a mensagem de erro   
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [newTask, setNewTask] = useState({
        id: "",
        title: "",
        description: "",
        category: "",
        priority: "Low",
    });

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            console.log(error);
            setErrorMessage("Error fetching tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate("/");//login page
        }
        fetchTasks();
    }, [auth, navigate]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/tasks", newTask);
            console.log(response);
            // setTasks([...tasks, { ...newTask, id: response.data }]);
            fetchTasks();
            setNewTask({ id: "", title: "", description: "", category: "", priority: "Low" });
        } catch (error) {
            setErrorMessage("Error creating task");
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (error) {
            setErrorMessage("Error deleting task:");
        }
    };

    const handleEdit = (taskId) => {
        // Redirecionar para a página de edição com o ID da tarefa
        navigate(`/tasks/edit/${taskId}`);
    };

    if (loading) return (
        <Layout errorMessage={errorMessage}>
            <div className="container mt-5">Loading tasks...</div>
        </Layout>
    );


    return (
        <Layout errorMessage={errorMessage}>
            <div className="container mt-5">
                <h2>Tasks</h2>

                {/* Formulário para criar novas tarefas */}
                <form onSubmit={handleCreateTask} className="mb-4">
                    <h4>Create a New Task</h4>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            value={newTask.description}
                            onChange={(e) =>
                                setNewTask({ ...newTask, description: e.target.value })
                            }
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <input
                            type="text"
                            className="form-control"
                            value={newTask.category}
                            onChange={(e) =>
                                setNewTask({ ...newTask, category: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Priority</label>
                        <select
                            className="form-select"
                            value={newTask.priority}
                            onChange={(e) =>
                                setNewTask({ ...newTask, priority: e.target.value })
                            }
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">
                        Create Task
                    </button>
                </form>

                {/* Tabela de tarefas */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={task.id}>
                                <td>{index + 1}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.category}</td>
                                <td>{task.priority}</td>
                                <td>{task.status}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => handleEdit(task.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteTask(task.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Tasks;