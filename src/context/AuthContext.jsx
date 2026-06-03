import React, {
    createContext, useState, useContext, useMemo,
} from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('airline_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (username, role) => {
        const userData = { username, role };
        setUser(userData);
        localStorage.setItem('airline_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('airline_user');
    };

    const value = useMemo(() => ({ user, login, logout }), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
