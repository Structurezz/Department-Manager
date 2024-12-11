import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    username: string | null;
    userId: number | null; // Make sure you have this
    setUsername: (username: string | null) => void;
    setUserId: (id: number | null) => void; // Setter for userId
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null); // Initialize userId state

    // Optionally, add logic to set username and userId when the user logs in

    return (
        <AuthContext.Provider value={{ username, userId, setUsername, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
