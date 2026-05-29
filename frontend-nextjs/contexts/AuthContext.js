import { createContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      apiClient.setToken(token);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, senha) => {
    const result = await apiClient.login(email, senha);
    apiClient.setToken(result.token);
    setUser(result.usuario);
    localStorage.setItem('user', JSON.stringify(result.usuario));
    return result;
  }, []);

  const register = useCallback(async (nome, email, senha, telefone, endereco, tipo) => {
    await apiClient.registerUser(nome, email, senha, telefone, endereco, tipo);
  }, []);

  const logout = useCallback(() => {
    apiClient.clearToken();
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const updateProfile = useCallback(async (nome, telefone, endereco) => {
    await apiClient.updateUserProfile(nome, telefone, endereco);
    setUser((prev) => ({
      ...prev,
      nome,
      telefone,
      endereco_principal: endereco,
    }));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
