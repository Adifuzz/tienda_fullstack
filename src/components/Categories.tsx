import { Link } from "react-router-dom"; // 1. Importamos Link

const categories = [
  { 
    name: "ZAPATILLAS", 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
    href: "/zapatillas" // 2. Agregamos la ruta
  },
  { 
    name: "ROPA DEPORTIVA", 
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop",
    href: "/ropa-deportiva" 
  },
  { 
    name: "ACCESORIOS", 
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
    href: "/accesorios" 
  },
  { 
    name: "TRAINING", 
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
    href: "/training" 
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black mb-12 text-center tracking-tight">
          CATEGORÍAS
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            // 3. Envolvemos la tarjeta en un Link usando la ruta definida
            <Link
              key={category.name}
              to={category.href}
              className="group relative overflow-hidden cursor-pointer rounded-sm aspect-[3/4] block"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-black text-primary-foreground tracking-tight">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;