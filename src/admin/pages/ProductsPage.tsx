import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { formatCurrency } from "@/lib/utils"; // Tu función de formato CLP
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

// --- Interfaces (Tipos) ---
interface Categoria {
  idCategoria: number;
  nombre: string;
}

interface Producto {
  idProducto: number;
  nombre: string;
  precio: number;
  stock: number;
  descripcion?: string;
  imagenUrl?: string;
  genero?: string;
  categoria?: Categoria;
}

export const ProductsPage = () => {
  const queryClient = useQueryClient();
  
  // Estados para el Modal y el Formulario
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    imagenUrl: "",
    idCategoria: "",
    genero: "",
  });

  // 1. Obtener Productos (GET)
  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => apiFetch("/productos"),
  });

  // 2. Obtener Categorías (GET) - Para el Select
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiFetch("/categorias"),
  });

  // 3. Mutación: Crear Producto (POST)
  const createMutation = useMutation({
    mutationFn: async (newProduct: any) => {
      return apiFetch("/productos", {
        method: "POST",
        body: JSON.stringify(newProduct),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Producto creado exitosamente");
      setIsOpen(false);
      // Limpiar formulario
      setFormData({
        nombre: "",
        precio: "",
        stock: "",
        descripcion: "",
        imagenUrl: "",
        idCategoria: "",
        genero: "",
      });
    },
    onError: () => toast.error("Error al crear el producto"),
  });

  // 4. Mutación: Eliminar Producto (DELETE)
  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiFetch(`/productos/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Producto eliminado");
    },
    onError: () => toast.error("No se pudo eliminar el producto"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validar Precio Negativo
    if (parseFloat(formData.precio) < 0) {
      toast.error("El precio no puede ser negativo");
      return;
    }

    // 2. Validar Stock Negativo
    if (parseInt(formData.stock) < 0) {
      toast.error("El stock no puede ser negativo");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      nombre: formData.nombre,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock),
      descripcion: formData.descripcion,
      imagenUrl: formData.imagenUrl,
      genero: formData.genero,
      categoria: formData.idCategoria ? { idCategoria: parseInt(formData.idCategoria) } : null
    };

    createMutation.mutate(payload, {
      onSettled: () => setIsSubmitting(false)
    });
  };

  if (isLoading) return <div className="p-8 text-center">Cargando inventario...</div>;

  return (
    <div className="p-6 space-y-6">
      
      {/* Encabezado con Botón de Crear */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
          <p className="text-muted-foreground">Gestiona el catálogo de tu tienda</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Producto</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              {/* Fila 1: Nombre y Categoría */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input 
                    id="nombre" 
                    placeholder="Ej: Zapatillas Running" 
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select 
                    onValueChange={(value) => setFormData({...formData, idCategoria: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((cat: Categoria) => (
                        <SelectItem key={cat.idCategoria} value={cat.idCategoria.toString()}>
                          {cat.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genero">Género</Label>
                  <Select 
                    onValueChange={(value) => setFormData({...formData, genero: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Para quién es..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HOMBRE">Hombre</SelectItem>
                      <SelectItem value="MUJER">Mujer</SelectItem>
                    </SelectContent>
                   </Select>
                </div>
              </div>
              

              {/* Fila 2: Precio y Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="precio">Precio (CLP)</Label>
                  <Input 
                    id="precio" 
                    type="number" 
                    placeholder="Ej: 29990" 
                    required
                    value={formData.precio}
                    onChange={(e) => setFormData({...formData, precio: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input 
                    id="stock" 
                    type="number" 
                    min="0"
                    placeholder="0" 
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  />
                </div>
              </div>

              {/* URL Imagen con Preview */}
              <div className="space-y-2">
                <Label htmlFor="imagen">URL Imagen</Label>
                <div className="flex gap-4 items-center">
                    <Input 
                        id="imagen" 
                        placeholder="https://ejemplo.com/foto.jpg" 
                        value={formData.imagenUrl}
                        onChange={(e) => setFormData({...formData, imagenUrl: e.target.value})}
                        className="flex-1"
                    />
                    {formData.imagenUrl && (
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-muted">
                            <img 
                              src={formData.imagenUrl} 
                              alt="Vista previa" 
                              className="h-full w-full object-cover"
                              onError={(e) => (e.currentTarget.style.display = 'none')} 
                            />
                        </div>
                    )}
                </div>
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea 
                  id="descripcion" 
                  placeholder="Detalles del producto..." 
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                />
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar Producto"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabla de Resultados */}
      <div className="border rounded-md bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: Producto) => (
              <TableRow key={product.idProducto}>
                <TableCell>
                    {product.imagenUrl ? (
                        <img 
                            src={product.imagenUrl} 
                            alt={product.nombre} 
                            className="h-10 w-10 rounded-md object-cover border"
                        />
                    ) : (
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                    )}
                </TableCell>
                <TableCell className="font-medium">{product.nombre}</TableCell>
                <TableCell>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground">
                        {product.categoria?.nombre || "General"}
                    </span>
                </TableCell>
                {/* AQUI SE APLICA EL FORMATO CLP */}
                <TableCell className="font-bold">{formatCurrency(product.precio)}</TableCell>
                <TableCell>
                  <span className={product.stock < 5 ? "text-red-500 font-bold" : ""}>
                    {product.stock} un.
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      if(confirm("¿Estás seguro de eliminar este producto?")) {
                        deleteMutation.mutate(product.idProducto);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            {(!products || products.length === 0) && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No hay productos registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};