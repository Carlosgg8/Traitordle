import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api.js'

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // On mount: Check localStorage for existing session
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData, userToken) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const register = async (formData) => {
    try {
        const response = await api.post('/api/auth/register', formData)
        login(response.data.user, response.data.token)
        return response.data
    } catch (error) {
        throw error
    }
  }

  const loginUser = async (formData) => {
    try {
        const response = await api.post('/api/auth/login', formData)
        login(response.data.user, response.data.token)
        return response.data
    } catch (error) {
        throw error
    }
    }

  return (
    <AuthContext.Provider value={{ user, token, login, loginUser, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};