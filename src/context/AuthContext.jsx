import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for logged-in user
        const storedUser = localStorage.getItem('milktrack_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (phone, password) => {
        const users = JSON.parse(localStorage.getItem('milktrack_users') || '[]');
        const foundUser = users.find(u => u.phone === phone && u.password === password);

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('milktrack_user', JSON.stringify(foundUser));
            return { success: true };
        }
        return { success: false, message: 'Invalid phone or password' };
    };

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('milktrack_users') || '[]');

        // Check if phone already exists
        if (users.find(u => u.phone === userData.phone)) {
            return { success: false, message: 'Phone number already registered' };
        }

        let newUser = { ...userData, id: Date.now().toString() };

        if (newUser.role === 'provider') {
            // Generate Provider ID: PROV-YYYY-XXXX
            const year = new Date().getFullYear();
            const randomId = Math.floor(1000 + Math.random() * 9000);
            newUser.providerId = `PROV-${year}-${randomId}`;
        }

        users.push(newUser);
        localStorage.setItem('milktrack_users', JSON.stringify(users));

        // Auto login after register
        setUser(newUser);
        localStorage.setItem('milktrack_user', JSON.stringify(newUser));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('milktrack_user');
    };

    const updateUser = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('milktrack_user', JSON.stringify(updatedUser)); // Update session

        // Update in main DB
        const users = JSON.parse(localStorage.getItem('milktrack_users') || '[]');
        const newUsers = users.map(u => u.id === user.id ? updatedUser : u);
        localStorage.setItem('milktrack_users', JSON.stringify(newUsers));
    }

    const getProviderById = (providerId) => {
        const users = JSON.parse(localStorage.getItem('milktrack_users') || '[]');
        return users.find(u => u.role === 'provider' && u.providerId === providerId);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, updateUser, getProviderById }}>
            {children}
        </AuthContext.Provider>
    );
};
