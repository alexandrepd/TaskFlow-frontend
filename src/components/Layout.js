import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Layout({ children }) {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link to={auth.isAuthenticated ? '/tasks' : '/'} className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-slate-900">TaskFlow</span>
                    </Link>

                    {/* Nav Desktop */}
                    <nav className="hidden sm:flex items-center gap-4">
                        {auth.isAuthenticated ? (
                            <>
                                <Link to="/tasks" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                                    Minhas tarefas
                                </Link>
                                {auth.role === 'Admin' && (
                                    <Link to="/admin" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                                        Usuários
                                    </Link>
                                )}
                                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                                    <span className="text-sm text-slate-500">
                                        Olá, <span className="font-medium text-slate-700">{auth.username || 'Usuário'}</span>
                                    </span>
                                    <button onClick={handleLogout} className="btn-secondary text-sm py-1.5 px-3">
                                        Sair
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link to="/login" className="btn-primary text-sm py-1.5 px-4">
                                Entrar
                            </Link>
                        )}
                    </nav>

                    {/* Hamburger Mobile */}
                    <button
                        className="sm:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Menu"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="sm:hidden border-t border-slate-200 bg-white px-4 py-3 flex flex-col gap-3">
                        {auth.isAuthenticated ? (
                            <>
                                <Link to="/tasks" className="text-sm font-medium text-slate-700" onClick={() => setMenuOpen(false)}>
                                    Minhas tarefas
                                </Link>
                                {auth.role === 'Admin' && (
                                    <Link to="/admin" className="text-sm font-medium text-slate-700" onClick={() => setMenuOpen(false)}>
                                        Usuários
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="text-sm text-left text-red-600 font-medium">Sair</button>
                            </>
                        ) : (
                            <Link to="/login" className="text-sm font-medium text-blue-600" onClick={() => setMenuOpen(false)}>Entrar</Link>
                        )}
                    </div>
                )}
            </header>

            {/* Main */}
            <main className="flex-1 w-full">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white text-slate-400 py-4 text-center text-sm">
                &copy; {new Date().getFullYear()} TaskFlow. Todos os direitos reservados.
            </footer>
        </div>
    );
}