import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiFetch } from "@/lib/api";

export interface User {
  idUsuario: number;
  nombreCompleto: string;
  email: string;
  rol?: string; // Asegúrate de que el backend envíe este campo
}

interface AuthContextType {
  user: User | null;
  // CAMBIO 1: La función ahora promete devolver un User
  login: (email: string, password: string) => Promise<User>; 
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

  // CAMBIO 2: Retornar el usuario al finalizar
  const login = async (email: string, password: string) => {
    const data = await apiFetch("/usuarios/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.usuario) {
      setUser(data.usuario);
      localStorage.setItem("ropaplus_user", JSON.stringify(data.usuario));
      return data.usuario; // <--- ESTO ES LA CLAVE
    }
    
    throw new Error("Error de autenticación");
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