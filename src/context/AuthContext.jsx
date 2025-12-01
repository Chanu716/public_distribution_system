import { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, loginUser, logoutUser } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = getCurrentUser();
        setUser(storedUser);
        setLoading(false);
    }, []);

    const login = (userData) => {
        loginUser(userData);
        setUser(userData);
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
