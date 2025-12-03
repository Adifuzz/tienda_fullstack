import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom"; // Importar Link para la navegación

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo con imagen y gradiente */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-primary-foreground tracking-tighter">
          NUEVA
          <br />
          COLECCIÓN
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto font-medium">
          Descubre nuestra última línea de ropa deportiva. Estilo y rendimiento en cada prenda.
        </p>
        
        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          {/* Botón 1: Comprar Ahora -> Lleva a Ofertas */}
          <Button 
            asChild 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base px-8 py-6 rounded-sm cursor-pointer"
          >
            <Link to="/ofertas">
              COMPRAR AHORA
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          {/* Botón 2: Ver Colección -> Lleva a Novedades */}
          <Button 
            asChild
            size="lg" 
            variant="outline" 
            className="font-bold text-base px-8 py-6 rounded-sm"
          >
            <Link to="/novedades">
              VER COLECCIÓN
            </Link>
          </Button>

        </div>
      </div>
    </section>
  );
};

export default Hero;