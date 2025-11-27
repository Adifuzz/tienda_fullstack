import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-black mb-4 tracking-tight">ROPAPLUS</h3>
            <p className="text-primary-foreground/80 text-sm">
              Tu destino para ropa deportiva de calidad premium.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wide">TIENDA</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Hombre</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Mujer</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Novedades</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Ofertas</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wide">AYUDA</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Envíos</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Devoluciones</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Tallas</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wide">SÍGUENOS</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© 2024 Ropaplus. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
