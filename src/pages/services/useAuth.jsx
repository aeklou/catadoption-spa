// src/services/useAuth.jsx
import { useState, useEffect, createContext, useContext } from 'react';
import { settings } from '../config/config';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthed, setIsAuthed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check for stored authentication on app load
        const token = localStorage.getItem('jwt_token');
        const userData = localStorage.getItem('user_data');

        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
                setIsAuthed(true);
            } catch (e) {
                // Clear invalid stored data
                localStorage.removeItem('jwt_token');
                localStorage.removeItem('user_data');
            }
        }
    }, []);

    const login = async (account, callback) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${settings.baseApiUrl}/users/authJWT`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(account)
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setIsAuthed(true);

                // Store in localStorage
                localStorage.setItem('jwt_token', data.jwt);
                localStorage.setItem('user_data', JSON.stringify(data));

                if (callback) callback();
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (account) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${settings.baseApiUrl}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(account)
            });

            if (response.ok) {
                const data = await response.json();
                return { success: true, data };
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Registration failed.');
                return { success: false };
            }
        } catch (err) {
            setError('Network error. Please try again.');
            return { success: false };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthed(false);
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_data');
    };

    const value = {
        user,
        isAuthed,
        isLoading,
        error,
        login,
        signup,
        logout,
        setError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};