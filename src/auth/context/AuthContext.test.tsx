import { render, screen, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthProvider, useAuth } from "./AuthContext";
import * as apiModule from "@/lib/api"; // Importamos para mockear apiFetch

// Componente de prueba para consumir el contexto
const TestComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  return (
    <div>
      <p data-testid="user-name">{user ? user.nombreCompleto : "Invitado"}</p>
      <p data-testid="auth-status">{isAuthenticated ? "Logueado" : "No Logueado"}</p>
      <button onClick={() => login("test@test.com", "123456")}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("debería iniciar sin usuario logueado", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId("user-name")).toHaveTextContent("Invitado");
    expect(screen.getByTestId("auth-status")).toHaveTextContent("No Logueado");
  });

  it("debería actualizar el estado al hacer login exitoso", async () => {
    // Mockeamos apiFetch para que simule un login exitoso
    const mockUser = { nombreCompleto: "Juan Perez", email: "juan@test.com", rol: "USER" };
    vi.spyOn(apiModule, "apiFetch").mockResolvedValue({ usuario: mockUser });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Hacemos clic en login
    await act(async () => {
      screen.getByText("Login").click();
    });

    // Esperamos que el estado cambie
    await waitFor(() => {
      expect(screen.getByTestId("user-name")).toHaveTextContent("Juan Perez");
      expect(screen.getByTestId("auth-status")).toHaveTextContent("Logueado");
    });

    // Verificamos que se guardó en localStorage
    expect(localStorage.getItem("ropaplus_user")).toContain("Juan Perez");
  });

  it("debería limpiar el estado al hacer logout", async () => {
    // Pre-configuramos un usuario en localStorage para simular que ya entró
    const mockUser = { nombreCompleto: "Juan Perez" };
    localStorage.setItem("ropaplus_user", JSON.stringify(mockUser));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Verificamos estado inicial (debe leer del localStorage)
    expect(screen.getByTestId("user-name")).toHaveTextContent("Juan Perez");

    // Hacemos logout
    act(() => {
      screen.getByText("Logout").click();
    });

    expect(screen.getByTestId("user-name")).toHaveTextContent("Invitado");
    expect(localStorage.getItem("ropaplus_user")).toBeNull();
  });
});