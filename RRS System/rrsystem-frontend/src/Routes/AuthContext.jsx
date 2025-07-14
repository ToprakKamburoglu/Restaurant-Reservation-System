import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setIsAuthenticated(true);
                    setUserType(data.userType);
                    setUserId(data.id);
                } else {
                    setIsAuthenticated(false);
                    setUserType(null);
                    setUserId(null);
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                setIsAuthenticated(false);
                setUserType(null);
                setUserId(null); 
            }
            setLoading(false);
        };
    
        checkAuthStatus();
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUserType(userData.userType);
        setUserId(userData.id);
    };

    const logout = async () => {
        await fetch("http://localhost:8081/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        setIsAuthenticated(false);
        setUserType(null);
        setUserId(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, userType, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
