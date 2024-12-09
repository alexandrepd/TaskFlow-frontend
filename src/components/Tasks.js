import React, { useEffect, useState } from "react";
import api from "../api";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get("/tasks");
                setTasks(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div className="container mt-5">

            {tasks.map((task) => (
                <div>
                    <p>{task.id}</p>
                    <p>{task.title}</p>
                    <p>{task.description}</p>
                    <p>{task.category}</p>
                    <p>{task.priority}</p>
                    <p>{task.status}</p>
                    <p>{task.createdAt}</p>
                    <p>{task.completedAt}</p>
                </div>
            ))}

        </div>
    );
};

export default Tasks;