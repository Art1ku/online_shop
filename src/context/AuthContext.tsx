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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) return false;

    let loggedUser: User;
    
    if (email === 'admin@forgestore.com' && password === 'admin') {
      loggedUser = { 
        id: 1, 
        email, 
        username: 'Admin User', 
        role: 'admin' 
      };
    } else if (email.includes('@') && password.length >= 3) {
      loggedUser = { 
        id: Date.now(), 
        email, 
        username: email.split('@')[0], 
        role: 'user' 
      };
    } else {
      return false;
    }

    setUser(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser));
    return true;
  };

  const register = async (email: string, username: string, password: string): Promise<boolean> => {
    if (!email || !username || password.length < 4) return false;
    
    const newUser: User = {
      id: Date.now(),
      email,
      username,
      role: 'user'
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
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