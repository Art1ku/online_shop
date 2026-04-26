import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY); 
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    const cleanEmail = email.trim().toLowerCase();

    const found = users.find(
      (u: any) => u.email === cleanEmail && u.password === password
    );

    if (!found) return false;

    const safeUser: User = {
      id: found.id,
      email: found.email,
      username: found.username,
      role: found.role,
    };

    setUser(safeUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

    return true;
  };

  const register = async (email: string, username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    const cleanEmail = email.trim().toLowerCase();

    const exists = users.find((u: any) => u.email === cleanEmail);
    if (exists) return false;

    const newUser: User = {
      id: Date.now(),
      email: cleanEmail,
      username,
      role: cleanEmail === 'admin@gmail.com' ? 'admin' : 'user',
    };

    const fullUser = { ...newUser, password };

    users.push(fullUser);

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    setUser(newUser);

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};