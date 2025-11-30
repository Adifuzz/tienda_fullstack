import { createBrowserRouter, Navigate } from "react-router-dom";

// --- Layouts ---
import { ShopLayout } from "@/shop/layouts/ShopLayout";
import { AdminLayout } from "@/admin/layouts/AdminLayout";

// --- Pages: Shop ---
import { HomePage } from "@/shop/pages/HomePage";
import { CatalogPage } from "@/shop/pages/CatalogPage"; // Catálogo reutilizable
import NotFound from "@/pages/NotFound";

// --- Pages: Auth ---
import { LoginPage } from "@/auth/pages/LoginPage";
import { RegisterPage } from "@/auth/pages/RegisterPage";

// --- Pages: Admin ---
import { ProductsPage } from "@/admin/pages/ProductsPage";
import { UsersPage } from "@/admin/pages/UsersPage";

// --- Guards ---
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  // 1. ZONA PÚBLICA (TIENDA)
  {
    path: "/",
    element: <ShopLayout />,
    errorElement: <NotFound />,
    children: [
      { 
        index: true, 
        element: <HomePage /> 
      },
      
      // --- Rutas de Catálogo ---
      {
        path: "hombre",
        element: <CatalogPage 
          title="Hombre" 
          description="Ropa y calzado deportivo para él."
          filterFn={(p) => p.genero === "HOMBRE"} 
        />
      },
      {
        path: "mujer",
        element: <CatalogPage 
          title="Mujer" 
          description="Estilo y rendimiento para ella."
          filterFn={(p) => p.genero === "MUJER"} 
        />
      },
      {
        path: "zapatillas",
        element: <CatalogPage 
          title="Zapatillas" 
          description="Calzado técnico para todo terreno."
          filterFn={(p) => p.categoria?.nombre === "Zapatillas"} 
        />
      },
      {
        path: "ropa-deportiva",
        element: <CatalogPage 
          title="Ropa Deportiva" 
          description="Vístete para ganar."
          filterFn={(p) => p.categoria?.nombre === "Ropa Deportiva"} 
        />
      },
      {
        path: "accesorios",
        element: <CatalogPage 
          title="Accesorios" 
          description="Complementos esenciales."
          filterFn={(p) => p.categoria?.nombre === "Accesorios"} 
        />
      },
      {
        path: "training",
        element: <CatalogPage 
          title="Training" 
          description="Equipamiento para tu entrenamiento funcional."
          filterFn={(p) => p.categoria?.nombre === "Training"} 
        />
      },
      {
        path: "novedades",
        element: <CatalogPage 
          title="Novedades" 
          description="Lo último en llegar a RopaPlus."
          filterFn={() => true} 
        />
      },
      {
        path: "ofertas",
        element: <CatalogPage 
          title="Ofertas" 
          description="Precios increíbles por tiempo limitado."
          filterFn={(p) => p.precio < 40000} 
        />
      },
    ],
  },
  
  // 2. ZONA DE AUTENTICACIÓN
  {
    path: "/auth",
    children: [
      { 
        path: "login", 
        element: <LoginPage /> 
      },
      { 
        path: "registro", 
        element: <RegisterPage /> 
      },
      { 
        index: true, 
        element: <Navigate to="/auth/login" replace /> 
      },
    ],
  },

  // 3. ZONA PRIVADA (ADMINISTRADOR)
  {
    path: "/admin",
    element: <PrivateRoute />, 
    children: [
      {
        element: <AdminLayout />,
        children: [
          { 
            index: true, 
            element: <Navigate to="/admin/products" replace /> 
          },
          { 
            path: "products", 
            element: <ProductsPage /> 
          },
          { 
            path: "users", 
            element: <UsersPage /> 
          },
        ],
      },
    ],
  },

  // 4. RUTA NO ENCONTRADA
  {
    path: "*",
    element: <NotFound />,
  },
]);