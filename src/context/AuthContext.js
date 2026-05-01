import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem("token");
        return { token, isAuthenticated: Boolean(token) };
    });

    const login = (token) => {
        localStorage.setItem("token", token);
        setAuth({ token: token, isAuthenticated: true });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuth({ token: null, isAuthenticated: false });
    };

    const value = useMemo(() => ({ auth, login, logout }), [auth]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};