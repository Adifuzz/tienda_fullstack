import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiFetch } from "@/lib/api";

export interface User {
  idUsuario: number;
  nombreCompleto: string;
  email: string;
  rol?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ropaplus_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, password: string) => {
    // Llama al endpoint del UsuarioController.java
    const data = await apiFetch("/usuarios/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    // El backend devuelve { mensaje: "...", usuario: {...} }
    if (data.usuario) {
      setUser(data.usuario);
      localStorage.setItem("ropaplus_user", JSON.stringify(data.usuario));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ropaplus_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;