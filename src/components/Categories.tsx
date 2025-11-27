const categories = [
  { name: "ZAPATILLAS", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop" },
  { name: "ROPA DEPORTIVA", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop" },
  { name: "ACCESORIOS", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop" },
  { name: "TRAINING", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop" },
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
            <div
              key={category.name}
              className="group relative overflow-hidden cursor-pointer rounded-sm aspect-[3/4]"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
