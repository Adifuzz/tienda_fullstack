# 🛒 RopaPlus - Frontend (Tienda & Admin)

Este repositorio contiene la aplicación web (SPA) de **RopaPlus**, construida con **React** y **Vite**. Incluye tanto la tienda pública para clientes como el panel de administración protegido.

## 🎨 Características

* **Tienda Pública:** Catálogo filtrable por categorías (Hombre, Mujer, Zapatillas), carrito de compras y detalle de productos.
* **Panel de Administración:** Gestión CRUD de Productos y Usuarios, protegido por rutas privadas.
* **Autenticación:** Login y Registro de usuarios con validación de roles (Admin/User).
* **Diseño Responsivo:** Interfaz moderna adaptada a móviles y escritorio.

## 💻 Tecnologías Utilizadas

* **Core:** React 18, TypeScript, Vite.
* **Estilos:** Tailwind CSS, Shadcn UI (Componentes).
* **Estado & Datos:** React Query (`@tanstack/react-query`), Context API.
* **Enrutamiento:** React Router DOM v6.
* **Testing:** Vitest, React Testing Library.
* **Iconos:** Lucide React.

## 📋 Prerrequisitos

* **Node.js** (v18 o superior).
* **Backend Corriendo:** Asegúrate de que el backend de Spring Boot esté ejecutándose en el puerto `8080`.

## 🚀 Instalación y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPO_FRONTEND>
    cd tienda_fullstack
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

4.  **Ejecutar Pruebas Unitarias:**
    ```bash
    npm run test
    ```

## 📂 Estructura del Proyecto

```text
src/
├── admin/          # Módulos del Panel de Administración
│   ├── layouts/    # Layout con Sidebar
│   └── pages/      # Páginas de gestión (ProductsPage, UsersPage)
├── auth/           # Módulo de Autenticación (Login, Registro, Contexto)
├── shop/           # Módulo de la Tienda Pública
│   ├── layouts/    # Navbar, Footer
│   └── pages/      # HomePage, CatalogPage, ProductDetailPage
├── components/     # Componentes UI reutilizables (Botones, Inputs, Cards)
├── lib/            # Utilidades (Cliente API, Formateadores)
└── router/         # Configuración de rutas y PrivateRoute

## 👨‍💻 Integrantes

- **Stanley Joseph**  
- **Adolfo Medina**


