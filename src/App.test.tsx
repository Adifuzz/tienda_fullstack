import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./shop/layouts/Navbar";
import { AuthProvider } from "./auth/context/AuthContext";

// Mock (simulación) simple para evitar errores de contexto o navegación
const MockNavbar = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </AuthProvider>
  );
};

describe("Navbar Component", () => {
  it("debería mostrar el nombre de la tienda", () => {
    // 1. Renderizamos el componente
    render(<MockNavbar />);

    // 2. Buscamos el texto "ROPAPLUS"
    const brandName = screen.getByText(/ROPAPLUS/i);

    // 3. Verificamos que esté en el documento
    expect(brandName).toBeInTheDocument();
  });
  
  it("debería tener un enlace a 'HOMBRE'", () => {
    render(<MockNavbar />);
    const linkElement = screen.getByText(/HOMBRE/i);
    expect(linkElement).toBeInTheDocument();
  });
});