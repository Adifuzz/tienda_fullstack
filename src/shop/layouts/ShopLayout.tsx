import { Outlet } from "react-router-dom";
import Navbar from "@/shop/layouts/Navbar"; 
import Footer from "@/shop/layouts/Footer";

export const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Aquí se renderizarán las páginas hijas como HomePage, ProductPage, etc. */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};