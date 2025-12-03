import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { formatCurrency } from "@/lib/utils"; // Tu función de formato CLP
import { Button } from "@/components/ui/button";
import { ShoppingCart, Image as ImageIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Interfaz basada en tu modelo de Backend
interface Producto {
  idProducto: number;
  nombre: string;
  precio: number;
  imagenUrl?: string;
  categoria?: { nombre: string };
}

const FeaturedProducts = () => {
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["productos-home"],
    queryFn: () => apiFetch("/productos"),
  });

  
  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-12 w-3/4 md:w-1/2 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-sm" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Estado de Error
  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        No se pudieron cargar los productos destacados.
      </div>
    );
  }

  // Filtrar solo los primeros 4 productos para la home (Opcional)
  const displayProducts = products?.slice(0, 4) || [];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-foreground">
            PRODUCTOS DESTACADOS
          </h2>
          <p className="text-muted-foreground text-lg">
            Lo mejor de nuestra colección
          </p>
        </div>
        
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product: Producto) => (
              <div
                key={product.idProducto}
                className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Imagen del Producto */}
                <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center">
                  {product.imagenUrl ? (
                    <img
                      src={product.imagenUrl}
                      alt={product.nombre}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-muted-foreground/20" />
                  )}
                  
                  {/* Etiqueta "NUEVO" (opcional, lógica de ejemplo) */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                      VER
                    </span>
                  </div>
                </div>
                
                {/* Info del Producto */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs font-bold text-accent mb-1 tracking-wide uppercase">
                    {product.categoria?.nombre || "GENERAL"}
                  </p>
                  
                  <h3 className="text-lg font-bold text-card-foreground line-clamp-1 mb-4" title={product.nombre}>
                    {product.nombre}
                  </h3>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-black text-foreground">
                      {formatCurrency(product.precio)}
                    </span>
                    
                    <Button 
                      size="icon"
                      className="rounded-full h-9 w-9 bg-primary hover:bg-primary/90 shadow-sm"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="sr-only">Agregar al carrito</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            No hay productos destacados disponibles en este momento.
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;