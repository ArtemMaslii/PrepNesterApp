'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkTokenExpiry = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now(); // Returns true if token is still valid
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      if (checkTokenExpiry(savedToken)) {
        setToken(savedToken);
        
        const payload = JSON.parse(atob(savedToken.split('.')[1]));
        const expiresIn = payload.exp * 1000 - Date.now();
        setTimeout(logout, expiresIn);
      } else {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken: string) => {
    if (!checkTokenExpiry(newToken)) {
      logout();
      return;
    }

    setToken(newToken);
    localStorage.setItem('token', newToken);

    const payload = JSON.parse(atob(newToken.split('.')[1]));
    const expiresIn = payload.exp * 1000 - Date.now();
    setTimeout(logout, expiresIn);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
      <AuthContext.Provider value={{token, login, logout, loading}}>
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}