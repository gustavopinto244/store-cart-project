/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { type AxiosError } from 'axios';
import axios from '../api/axios';
import { getToken, setToken, removeToken } from '../utils/tokenStorage';

interface AuthUser {
  _id: string;
  name: string;
  email: string;
}

interface MeResponse {
  authenticated: boolean;
  user: AuthUser | null;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  errors?: string[];
  token?: string;
  user?: AuthUser;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (name: string, email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      const res = await axios.get<MeResponse>('/login/me');
      if (res.data.authenticated && res.data.user) {
        setUser(res.data.user);
      } else {
        removeToken();
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const res = await axios.post<AuthResponse>('/login/login', { email, password });
      if (res.data.success && res.data.token && res.data.user) {
        setToken(res.data.token);
        setUser(res.data.user);
      }
      return res.data;
    } catch (err) {
      const axiosError = err as AxiosError<AuthResponse>;
      return (
        axiosError.response?.data ?? {
          success: false,
          errors: ['Network error. Is the server running?'],
        }
      );
    }
  };

  const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      const res = await axios.post<AuthResponse>('/login/register', { name, email, password });
      if (res.data.success && res.data.token && res.data.user) {
        setToken(res.data.token);
        setUser(res.data.user);
      }
      return res.data;
    } catch (err) {
      const axiosError = err as AxiosError<AuthResponse>;
      return (
        axiosError.response?.data ?? {
          success: false,
          errors: ['Network error. Is the server running?'],
        }
      );
    }
  };

  const logout = async () => {
    try {
      await axios.post('/login/logout');
    } catch {
      // proceed even if request fails
    }
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
