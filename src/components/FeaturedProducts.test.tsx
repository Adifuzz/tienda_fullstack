import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FeaturedProducts from "./FeaturedProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as apiModule from "@/lib/api";

// Configuración necesaria para React Query en tests
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // No reintentar en tests para que falle rápido si hay error
    },
  },
});

describe("FeaturedProducts Component", () => {
  it("debería mostrar productos cuando la API responde correctamente", async () => {
    // 1. Mock de los datos
    const mockProducts = [
      { idProducto: 1, nombre: "Zapatilla Test", precio: 10000, imagenUrl: "", categoria: { nombre: "Test" } },
      { idProducto: 2, nombre: "Polera Test", precio: 5000, imagenUrl: "", categoria: { nombre: "Test" } }
    ];
    
    vi.spyOn(apiModule, "apiFetch").mockResolvedValue(mockProducts);

    // 2. Renderizar con el proveedor de Query
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <FeaturedProducts />
      </QueryClientProvider>
    );

    // 3. Verificar que aparece el texto de carga o los productos
    // Esperamos a que el texto del producto aparezca
    await waitFor(() => {
      expect(screen.getByText("Zapatilla Test")).toBeInTheDocument();
      expect(screen.getByText("Polera Test")).toBeInTheDocument();
    });
  });

  it("debería manejar el error si la API falla", async () => {
    // Simulamos error
    vi.spyOn(apiModule, "apiFetch").mockRejectedValue(new Error("Error de red"));

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <FeaturedProducts />
      </QueryClientProvider>
    );

    // Esperamos el mensaje de error que definimos en el componente
    await waitFor(() => {
      expect(screen.getByText(/No se pudieron cargar/i)).toBeInTheDocument();
    });
  });
});