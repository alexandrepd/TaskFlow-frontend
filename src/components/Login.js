import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import Layout from "./Layout";

function validate({ username, password }) {
    const errors = {};
    if (!username.trim()) errors.username = 'Usuário é obrigatório.';
    if (!password) errors.password = 'Senha é obrigatória.';
    else if (password.length < 6) errors.password = 'Senha deve ter pelo menos 6 caracteres.';
    return errors;
}

const Login = () => {
    const [fields, setFields] = useState({ username: '', password: '' });
    const [touched, setTouched] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const errors = validate(fields);
    const hasErrors = Object.keys(errors).length > 0;

    const handleChange = (e) => {
        setFields(f => ({ ...f, [e.target.name]: e.target.value }));
        setServerError('');
    };

    const handleBlur = (e) => {
        setTouched(t => ({ ...t, [e.target.name]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ username: true, password: true });
        if (hasErrors) return;

        setLoading(true);
        setServerError('');
        try {
            const response = await api.post('/auth/login', {
                username: fields.username,
                password: fields.password,
            });
            login(response.data.token);
            navigate('/tasks');
        } catch (error) {
            const message = error.response?.data?.message
                || (error.response?.status === 401 ? 'Usuário ou senha incorretos.' : 'Erro ao conectar. Tente novamente.');
            setServerError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Bem-vindo de volta</h1>
                        <p className="text-slate-500 text-sm mt-1">Entre com sua conta para continuar</p>
                    </div>

                    <div className="card p-8">
                        {/* Server error */}
                        {serverError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                                <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm text-red-700">{serverError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate className="space-y-4">
                            {/* Username */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                                    Usuário
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    autoFocus
                                    className={`input-field ${touched.username && errors.username ? 'border-red-400 focus:ring-red-400' : ''}`}
                                    value={fields.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Seu usuário"
                                />
                                {touched.username && errors.username && (
                                    <p className="mt-1 text-xs text-red-600">{errors.username}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                    Senha
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        className={`input-field pr-10 ${touched.password && errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
                                        value={fields.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Sua senha"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        tabIndex={-1}
                                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                    >
                                        {showPassword ? (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {touched.password && errors.password && (
                                    <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="btn-primary w-full py-2.5 flex items-center justify-center gap-2 mt-2"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        Entrando...
                                    </>
                                ) : 'Entrar'}
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-slate-500 mt-4">
                        Não tem conta?{' '}
                        <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                            Criar conta
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
