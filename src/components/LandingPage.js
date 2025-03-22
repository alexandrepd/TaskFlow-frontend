import React from 'react';

import { Link } from 'react-router-dom';
import Layout from './Layout';


export default function LandingPage() {

    return (
        <Layout>
            <main className="flex flex-col items-center justify-center flex-1 p-8 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Bem-vindo ao TaskFlow</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Gerencie suas tarefas de forma eficiente e organizada. Acesse suas tarefas de qualquer lugar e mantenha-se produtivo.
                </p>
                <Link to="/login">
                    <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
                        Comece Agora
                    </button>
                </Link>
            </main>

        </Layout >
    );
}
