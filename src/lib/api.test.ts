import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiFetch, API_URL } from "./api";

// Simulamos la función fetch global
const globalFetch = vi.fn();
global.fetch = globalFetch;

describe("apiFetch Utility", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("debería llamar a la URL correcta con las cabeceras por defecto", async () => {
    // Simulamos una respuesta exitosa
    globalFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ data: "test" }),
    });

    await apiFetch("/productos");

    expect(globalFetch).toHaveBeenCalledWith(
      `${API_URL}/productos`,
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });

  it("debería lanzar un error cuando la respuesta no es ok", async () => {
    // Simulamos un error del servidor (ej: 400 Bad Request)
    globalFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Error de validación" }),
    });

    await expect(apiFetch("/usuarios")).rejects.toThrow("Error de validación");
  });

  it("debería devolver null si el status es 204 (No Content)", async () => {
    globalFetch.mockResolvedValue({
      ok: true,
      status: 204,
    });

    const result = await apiFetch("/borrar/1");
    expect(result).toBeNull();
  });
});
