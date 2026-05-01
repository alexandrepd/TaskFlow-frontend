import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import Layout from "./Layout";

function validate({ username, password, confirmPassword }) {
    const errors = {};
    if (!username.trim()) {
        errors.username = 'Usuário é obrigatório.';
    } else if (username.length < 3) {
        errors.username = 'Usuário deve ter pelo menos 3 caracteres.';
    } else if (username.length > 50) {
        errors.username = 'Usuário deve ter no máximo 50 caracteres.';
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.username = 'Apenas letras, números e underscores.';
    }

    if (!password) {
        errors.password = 'Senha é obrigatória.';
    } else if (password.length < 8) {
        errors.password = 'Senha deve ter pelo menos 8 caracteres.';
    } else if (!/[A-Z]/.test(password)) {
        errors.password = 'Senha deve ter ao menos uma letra maiúscula.';
    } else if (!/[0-9]/.test(password)) {
        errors.password = 'Senha deve ter ao menos um número.';
    }

    if (!confirmPassword) {
        errors.confirmPassword = 'Confirme sua senha.';
    } else if (password && confirmPassword !== password) {
        errors.confirmPassword = 'As senhas não coincidem.';
    }

    return errors;
}

function PasswordStrength({ password }) {
    if (!password) return null;
    const checks = [
        { label: '8+ caracteres', ok: password.length >= 8 },
        { label: 'Letra maiúscula', ok: /[A-Z]/.test(password) },
        { label: 'Número', ok: /[0-9]/.test(password) },
    ];
    const score = checks.filter(c => c.ok).length;
    const color = score === 3 ? 'bg-green-500' : score === 2 ? 'bg-yellow-400' : 'bg-red-400';
    return (
        <div className="mt-2 space-y-1">
            <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < score ? color : 'bg-slate-200'}`} />
                ))}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                {checks.map(c => (
                    <span key={c.label} className={`text-xs ${c.ok ? 'text-green-600' : 'text-slate-400'}`}>
                        {c.ok ? '✓' : '○'} {c.label}
                    </span>
                ))}
            </div>
        </div>
    );
}

const Register = () => {
    const [fields, setFields] = useState({ username: '', password: '', confirmPassword: '' });
    const [touched, setTouched] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

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
        setTouched({ username: true, password: true, confirmPassword: true });
        if (hasErrors) return;

        setLoading(true);
        setServerError('');
        try {
            const response = await api.post('/auth/register', {
                username: fields.username,
                password: fields.password,
            });
            login(response.data.token);
            navigate('/tasks');
        } catch (error) {
            const message = error.response?.data?.message
                || (error.response?.status === 409 ? 'Este usuário já está em uso.' : 'Erro ao criar conta. Tente novamente.');
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Criar conta</h1>
                        <p className="text-slate-500 text-sm mt-1">Registre-se para começar a usar o TaskFlow</p>
                    </div>

                    <div className="card p-8">
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
                                    placeholder="Escolha um usuário"
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
                                        autoComplete="new-password"
                                        className={`input-field pr-10 ${touched.password && errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
                                        value={fields.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Crie uma senha forte"
                                    />
                                    <button type="button" onClick={() => setShowPassword(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" tabIndex={-1}>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {showPassword
                                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                                            }
                                        </svg>
                                    </button>
                                </div>
                                {touched.password && errors.password && (
                                    <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                                )}
                                <PasswordStrength password={fields.password} />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
                                    Confirmar senha
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirm ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        className={`input-field pr-10 ${touched.confirmPassword && errors.confirmPassword ? 'border-red-400 focus:ring-red-400' : ''}`}
                                        value={fields.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Repita a senha"
                                    />
                                    <button type="button" onClick={() => setShowConfirm(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" tabIndex={-1}>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {showConfirm
                                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                                            }
                                        </svg>
                                    </button>
                                </div>
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                                )}
                            </div>

                            <button type="submit" className="btn-primary w-full py-2.5 flex items-center justify-center gap-2 mt-2" disabled={loading}>
                                {loading ? (
                                    <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Criando conta...</>
                                ) : 'Criar conta'}
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-slate-500 mt-4">
                        Já tem conta?{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Entrar</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
