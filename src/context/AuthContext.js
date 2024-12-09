import react, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, isAuthenticated: false });

    const login = (token) => {
        console.log(token);
        localStorage.setItem("token", token);
        setAuth({ token: token, isAuthenticated: true });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuth({ token: null, isAuthenticated: false });
    };

    const value = { auth, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};