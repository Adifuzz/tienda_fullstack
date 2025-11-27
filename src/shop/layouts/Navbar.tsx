import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-black tracking-tight">ROPAPLUS</h1>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium hover:text-accent transition-colors">
                HOMBRE
              </a>
              <a href="#" className="text-sm font-medium hover:text-accent transition-colors">
                MUJER
              </a>
              <a href="#" className="text-sm font-medium hover:text-accent transition-colors">
                NOVEDADES
              </a>
              <a href="#" className="text-sm font-medium hover:text-accent transition-colors">
                OFERTAS
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
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
