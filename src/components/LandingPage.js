import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

const features = [
    {
        icon: (
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
        title: 'Organize suas tarefas',
        description: 'Crie, priorize e categorize suas tarefas em um só lugar.',
    },
    {
        icon: (
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: 'Acompanhe o progresso',
        description: 'Visualize o status de cada tarefa e mantenha-se no controle.',
    },
    {
        icon: (
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        ),
        title: 'Acesse de qualquer lugar',
        description: 'Seus dados sincronizados e disponíveis sempre que precisar.',
    },
];

export default function LandingPage() {
    return (
        <Layout>
            {/* Hero */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Produtividade simplificada
                </span>
                <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                    Gerencie suas tarefas<br />
                    <span className="text-blue-600">com clareza e foco</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10">
                    TaskFlow é uma ferramenta simples e eficiente para organizar o seu dia, acompanhar prioridades e manter o ritmo.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/login" className="btn-primary px-8 py-3 text-base">
                        Começar agora
                    </Link>
                    <Link to="/register" className="btn-secondary px-8 py-3 text-base">
                        Criar conta
                    </Link>
                </div>
            </section>

            {/* Features */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {features.map((f) => (
                        <div key={f.title} className="card p-6">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                                {f.icon}
                            </div>
                            <h3 className="text-base font-semibold text-slate-800 mb-1">{f.title}</h3>
                            <p className="text-sm text-slate-500">{f.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
