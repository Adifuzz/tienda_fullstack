import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const ProductsPage = () => {
  const queryClient = useQueryClient();
  // Obtener productos
  const { data: products } = useQuery({ queryKey: ["products"], queryFn: () => apiFetch("/productos") });

  // Eliminar producto
  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiFetch(`/productos/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Producto eliminado");
    }
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((p: any) => (
              <TableRow key={p.idProducto}>
                <TableCell>{p.nombre}</TableCell>
                <TableCell>€{p.precio}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => deleteMutation.mutate(p.idProducto)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};