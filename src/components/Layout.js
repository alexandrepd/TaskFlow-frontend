import React from 'react';
import { Link } from 'react-router-dom'; // Corrigir a importação do Link
import ErrorMessage from './ErrorMessage';

export default function Layout({ children, errorMessage }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            {/* Cabeçalho */}
            <header className="w-full bg-blue-500 text-white py-4">
                <Link to="/"> {/* Corrigir o atributo para 'to' */}
                    <h1 className="text-3xl font-bold text-center">TaskFlow</h1>
                </Link>
            </header>

            {/* Conteúdo principal */}
            <main className="flex-1 w-full flex items-center justify-center p-8">
                {children}
            </main>

            <ErrorMessage message={errorMessage} />

            {/* Rodapé */}
            <footer className="w-full bg-gray-200 text-gray-600 py-4 text-center">
                &copy; 2025 TaskFlow. Todos os direitos reservados.
            </footer>
        </div>
    );
}