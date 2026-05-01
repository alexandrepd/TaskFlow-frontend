import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const ROLE_BADGE = {
    Admin: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700',
    User: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600',
};

export default function AdminUsers() {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/login');
            return;
        }
        if (auth.role !== 'Admin') {
            navigate('/tasks');
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await api.get('/auth/users');
                setUsers(response.data);
            } catch (err) {
                const message = err.response?.data?.message || 'Erro ao carregar usuários.';
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [auth, navigate]);

    const filteredUsers = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return users;
        return users.filter(u =>
            u.username.toLowerCase().includes(term) || u.role.toLowerCase().includes(term)
        );
    }, [users, search]);

    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Gestão de usuários</h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Painel administrativo com todos os usuários registrados.
                        </p>
                    </div>

                    <div className="w-full sm:w-72">
                        <label htmlFor="searchUsers" className="sr-only">Buscar usuários</label>
                        <input
                            id="searchUsers"
                            type="text"
                            className="input-field"
                            placeholder="Buscar por usuário ou role"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="flex justify-center py-16">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                    </div>
                )}

                {!loading && filteredUsers.length === 0 && (
                    <div className="card p-10 text-center">
                        <h3 className="font-semibold text-slate-700 mb-1">Nenhum usuário encontrado</h3>
                        <p className="text-sm text-slate-500">Ajuste sua busca para encontrar usuários.</p>
                    </div>
                )}

                {!loading && filteredUsers.length > 0 && (
                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase">Usuário</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase">Role</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-wide text-slate-500 uppercase">Id</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 text-sm font-medium text-slate-800">{user.username}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className={ROLE_BADGE[user.role] || ROLE_BADGE.User}>{user.role}</span>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-slate-400 font-mono">{user.id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
