import { createContext, useCallback, useMemo, useState } from "react";

export const AuthContext = createContext();

function parseJwt(token) {
    try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return {
            username: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || decoded.sub || '',
            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.role || '',
        };
    } catch {
        return { username: '', role: '' };
    }
}

function buildAuth(token) {
    if (!token) return { token: null, isAuthenticated: false, username: '', role: '' };
    const { username, role } = parseJwt(token);
    return { token, isAuthenticated: true, username, role };
}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem("token");
        return buildAuth(token);
    });

    const login = useCallback((token) => {
        localStorage.setItem("token", token);
        setAuth(buildAuth(token));
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setAuth({ token: null, isAuthenticated: false, username: '', role: '' });
    }, []);

    const value = useMemo(() => ({ auth, login, logout }), [auth, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
