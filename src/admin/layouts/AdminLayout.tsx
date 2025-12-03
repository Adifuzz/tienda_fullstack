import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AdminSidebar } from "@/components/AdminSidebar";

export const AdminLayout = () => {
  const location = useLocation();
  
  // Generar breadcrumbs simples basados en la URL
  const pathSegments = location.pathname.split("/").filter((segment) => segment !== "");

  return (
    <SidebarProvider>
      {/* 1. Barra Lateral */}
      <AdminSidebar />

      {/* 2. Contenido Principal (Inset) */}
      <SidebarInset>
        {/* Header del Admin */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              
              {pathSegments.map((segment, index) => {
                if (segment === "admin") return null; // Ya lo agregamos manualmente
                const isLast = index === pathSegments.length - 1;
                
                return (
                  <div key={segment} className="flex items-center gap-2">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="capitalize">{segment}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={`/admin/${segment}`} className="capitalize">
                          {segment}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Aquí se renderizan las páginas (Dashboard, Products, Users) */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min mt-4">
             <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;