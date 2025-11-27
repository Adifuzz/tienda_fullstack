import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Zapatillas Ultra Run",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
    category: "Zapatillas"
  },
  {
    id: 2,
    name: "Camiseta Performance Pro",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    category: "Ropa"
  },
  {
    id: 3,
    name: "Pantalón Jogger Elite",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=600&fit=crop",
    category: "Ropa"
  },
  {
    id: 4,
    name: "Chaqueta Training Pro",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop",
    category: "Ropa"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            PRODUCTOS DESTACADOS
          </h2>
          <p className="text-muted-foreground text-lg">
            Lo mejor de nuestra colección
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-sm">
                    NUEVO
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-xs font-bold text-muted-foreground mb-2 tracking-wide">
                  {product.category.toUpperCase()}
                </p>
                <h3 className="text-lg font-bold mb-3 text-card-foreground">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black">
                    €{product.price}
                  </span>
                  <Button 
                    size="icon"
                    className="bg-primary hover:bg-primary/90 rounded-sm"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
