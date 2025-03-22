import React, { useEffect, useState } from "react";

export default function ErrorMessage({ message }) {
    const [visible, setVisible] = useState(false); // Estado para controlar a visibilidade

    useEffect(() => {
        if (message) {
            setVisible(true); // Torna a mensagem visível
            const timer = setTimeout(() => {
                setVisible(false); // Remove a mensagem após 10 segundos
            }, 10000);

            return () => clearTimeout(timer); // Limpa o temporizador se o componente for desmontado
        }
    }, [message]);

    if (!message || !visible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-red-500 text-white text-center py-2 z-50">
            {message}
        </div>
    );
}