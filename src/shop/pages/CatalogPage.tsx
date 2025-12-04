import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Image as ImageIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Producto {
  idProducto: number;
  nombre: string;
  precio: number;
  imagenUrl?: string;
  genero?: string;
  categoria?: { nombre: string };
}

interface CatalogPageProps {
  title: string;
  description?: string;
  filterFn: (product: Producto) => boolean; // Función para filtrar los productos
}

export const CatalogPage = ({ title, description, filterFn }: CatalogPageProps) => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"], 
    queryFn: () => apiFetch("/productos"),
  });


  const filteredProducts = products?.filter(filterFn) || [];

  if (isLoading) return <CatalogSkeleton />;
  if (error) return <div className="p-10 text-center text-red-500">Error cargando productos.</div>;

  return (
    <div className="container mx-auto px-4 py-12">
  
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">{title}</h1>
        {description && <p className="text-muted-foreground text-lg">{description}</p>}
      </div>


      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: Producto) => (
            <div
              key={product.idProducto}
              className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
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
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs font-bold text-accent mb-1 tracking-wide uppercase">
                  {product.categoria?.nombre || "GENERAL"}
                </p>
                <h3 className="text-lg font-bold text-card-foreground line-clamp-1 mb-4">
                  {product.nombre}
                </h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-black text-foreground">
                    {formatCurrency(product.precio)}
                  </span>
                  <Button size="icon" className="rounded-full h-9 w-9 bg-primary hover:bg-primary/90 shadow-sm">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-lg">
          <p className="text-xl text-muted-foreground">No se encontraron productos en esta sección.</p>
        </div>
      )}
    </div>
  );
};


const CatalogSkeleton = () => (
  <div className="container mx-auto py-12">
    <div className="mb-10 text-center space-y-4">
      <Skeleton className="h-10 w-48 mx-auto" />
      <Skeleton className="h-6 w-96 mx-auto" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-sm" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      ))}
    </div>
  </div>
);