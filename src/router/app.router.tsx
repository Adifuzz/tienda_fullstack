import { createBrowserRouter, Navigate } from "react-router-dom";
import { ShopLayout } from "@/shop/layouts/ShopLayout";
import { HomePage } from "@/shop/pages/HomePage";
import { LoginPage } from "@/auth/pages/LoginPage";
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { ProductsPage } from "@/admin/pages/ProductsPage";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ShopLayout />, 
    children: [
      { index: true, element: <HomePage /> }
    ]
  },
  {
    path: "/auth/login",
    element: <LoginPage />
  },
  {
    path: "/admin",
    element: <PrivateRoute />,
    children: [
      {
        element: <AdminLayout />, // Layout con Sidebar
        children: [
          { index: true, element: <Navigate to="/admin/products" /> },
          { path: "products", element: <ProductsPage /> },
          // Agregar aquí UsersPage similar a ProductsPage
        ]
      }
    ]
  }
]);