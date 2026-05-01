import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Layout from "./Layout";

const STATUS_BADGE = {
    Pending: 'badge-pending',
    InProgress: 'badge-inprogress',
    Completed: 'badge-completed',
    Cancelled: 'badge-cancelled',
};
const STATUS_LABEL = {
    Pending: 'Pendente',
    InProgress: 'Em andamento',
    Completed: 'Concluída',
    Cancelled: 'Cancelada',
};
const PRIORITY_BADGE = {
    High: 'badge-high',
    Medium: 'badge-medium',
    Low: 'badge-low',
};
const PRIORITY_LABEL = { High: 'Alta', Medium: 'Média', Low: 'Baixa' };

const EMPTY_TASK = { title: '', description: '', category: '', priority: 'Low' };

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const { auth } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState(EMPTY_TASK);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao carregar tarefas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!auth.isAuthenticated) { navigate('/login'); return; }
        fetchTasks();
    }, [auth, navigate]);

    const handleCreate = async (e) => {
        e.preventDefault();
        setCreating(true);
        setError('');
        try {
            await api.post('/tasks', {
                title: newTask.title,
                description: newTask.description,
                category: newTask.category,
                priority: newTask.priority,
            });
            setNewTask(EMPTY_TASK);
            setShowForm(false);
            await fetchTasks();
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao criar tarefa.');
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (taskId) => {
        setDeletingId(taskId);
        setError('');
        try {
            await api.delete(`/tasks/${taskId}`);
            setTasks(prev => prev.filter(t => t.id !== taskId));
        } catch (err) {
            setError(err.response?.data?.message || 'Erro ao deletar tarefa.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                {/* Page header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Minhas tarefas</h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            {loading ? '...' : `${tasks.length} tarefa${tasks.length !== 1 ? 's' : ''}`}
                        </p>
                    </div>
                    <button onClick={() => setShowForm(o => !o)} className="btn-primary flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showForm ? 'M6 18L18 6M6 6l12 12' : 'M12 4v16m8-8H4'} />
                        </svg>
                        {showForm ? 'Cancelar' : 'Nova tarefa'}
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center justify-between">
                        <span>{error}</span>
                        <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Create form */}
                {showForm && (
                    <div className="card p-6 mb-6">
                        <h2 className="text-base font-semibold text-slate-800 mb-4">Nova tarefa</h2>
                        <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Título <span className="text-red-500">*</span></label>
                                <input className="input-field" value={newTask.title}
                                    onChange={e => setNewTask({ ...newTask, title: e.target.value })} required />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                                <textarea rows={3} className="input-field resize-none" value={newTask.description}
                                    onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                                <input className="input-field" value={newTask.category}
                                    onChange={e => setNewTask({ ...newTask, category: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Prioridade</label>
                                <select className="input-field" value={newTask.priority}
                                    onChange={e => setNewTask({ ...newTask, priority: e.target.value })}>
                                    <option value="Low">Baixa</option>
                                    <option value="Medium">Média</option>
                                    <option value="High">Alta</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                                <button type="button" className="btn-secondary" onClick={() => { setShowForm(false); setNewTask(EMPTY_TASK); }}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-primary" disabled={creating}>
                                    {creating ? 'Criando...' : 'Criar tarefa'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center py-16">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                    </div>
                )}

                {/* Empty state */}
                {!loading && tasks.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-slate-700 font-medium mb-1">Nenhuma tarefa ainda</h3>
                        <p className="text-slate-400 text-sm">Clique em "Nova tarefa" para começar.</p>
                    </div>
                )}

                {/* Task cards */}
                {!loading && tasks.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map(task => (
                            <div key={task.id} className="card p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2">{task.title}</h3>
                                    <span className={PRIORITY_BADGE[task.priority] || 'badge-low'}>
                                        {PRIORITY_LABEL[task.priority] || task.priority}
                                    </span>
                                </div>

                                {task.description && (
                                    <p className="text-xs text-slate-500 line-clamp-2">{task.description}</p>
                                )}

                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={STATUS_BADGE[task.status] || 'badge-pending'}>
                                        {STATUS_LABEL[task.status] || task.status}
                                    </span>
                                    {task.category && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-500">
                                            {task.category}
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-2 pt-1 border-t border-slate-100 mt-auto">
                                    <button
                                        onClick={() => navigate(`/tasks/edit/${task.id}`)}
                                        className="flex-1 btn-secondary text-xs py-1.5"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        disabled={deletingId === task.id}
                                        className="flex-1 btn-danger text-xs py-1.5"
                                    >
                                        {deletingId === task.id ? '...' : 'Excluir'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Tasks;