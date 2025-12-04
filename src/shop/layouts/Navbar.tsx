import { ShoppingCart, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/auth/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          

          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-black tracking-tight hover:opacity-90 transition-opacity">
              ROPAPLUS
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link to="/hombre" className="text-sm font-medium hover:text-accent transition-colors">
                HOMBRE
              </Link>
              <Link to="/mujer" className="text-sm font-medium hover:text-accent transition-colors">
                MUJER
              </Link>
              <Link to="/novedades" className="text-sm font-medium hover:text-accent transition-colors">
                NOVEDADES
              </Link>
              <Link to="/ofertas" className="text-sm font-medium hover:text-accent transition-colors">
                OFERTAS
              </Link>
            </div>
          </div>
          

          <div className="flex items-center gap-4">
            

            {isAuthenticated && user ? (
   
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 font-medium px-2">
                    <User className="h-5 w-5" />

                    <span className="hidden sm:inline">
                      Hola, {user.nombreCompleto.split(" ")[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
       
                  {user.rol === 'ADMIN' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer font-medium">
                        Panel Administrativo
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (

              <Button asChild variant="ghost" size="sm" className="gap-2">
                <Link to="/auth/login">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline font-medium">Ingresar</span>
                </Link>
              </Button>
            )}

            {/* Botón Carrito */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-[10px] font-bold flex items-center justify-center text-accent-foreground">
                0
              </span>
            </Button>
            

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;