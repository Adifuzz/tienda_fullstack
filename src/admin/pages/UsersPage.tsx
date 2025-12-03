import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
// CAMBIO AQUÍ: Reemplazamos ShieldLock por Lock
import { Pencil, Trash2, Search, Lock } from "lucide-react"; 
import { toast } from "sonner";

interface Usuario {
  idUsuario: number;
  nombreCompleto: string;
  email: string;
  telefono?: string;
  direccion?: string;
  rol: string;
  activo: boolean;
  fechaRegistro?: string;
}

export const UsersPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => apiFetch("/usuarios"),
  });

  const updateMutation = useMutation({
    mutationFn: async (user: Usuario) => {
      return apiFetch(`/usuarios/${user.idUsuario}`, {
        method: "PUT",
        body: JSON.stringify(user),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Usuario actualizado");
      setIsEditOpen(false);
    },
    onError: () => toast.error("Error al actualizar"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiFetch(`/usuarios/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Usuario eliminado");
    },
    onError: () => toast.error("Error al eliminar"),
  });

  const handleEditClick = (user: Usuario) => {
    setCurrentUser(user);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setIsSubmitting(true);
    updateMutation.mutate(currentUser, { onSettled: () => setIsSubmitting(false) });
  };

  const filteredUsers = users?.filter((user: Usuario) => {
    const term = searchTerm.toLowerCase();
    return (
      user.nombreCompleto.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  if (isLoading) return <div className="p-8 text-center">Cargando usuarios...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
          <p className="text-muted-foreground">Administra los accesos</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 bg-white p-2 rounded-md border w-full md:w-1/3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Buscar usuario..."
          className="flex-1 outline-none text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="border rounded-md bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers?.map((user: Usuario) => {
              // Identificamos al super admin
              const isSuperAdmin = user.email === "admin@ropaplus.com"; 

              return (
                <TableRow key={user.idUsuario}>
                  <TableCell className="font-medium">#{user.idUsuario}</TableCell>
                  <TableCell>{user.nombreCompleto}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.rol === "ADMIN" ? "default" : "secondary"}>
                      {user.rol}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.activo ? "outline" : "destructive"} className={user.activo ? "text-green-600 border-green-600" : ""}>
                      {user.activo ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {isSuperAdmin ? (
                      // CAMBIO AQUÍ: Usamos el ícono Lock
                      <div className="flex justify-end items-center gap-2 text-muted-foreground" title="Este usuario no se puede modificar">
                        <span className="text-xs font-medium">Protegido</span>
                        <Lock className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditClick(user)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => {
                            if(confirm(`¿Eliminar a ${user.nombreCompleto}?`)) {
                              deleteMutation.mutate(user.idUsuario);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
          </DialogHeader>
          {currentUser && (
            <form onSubmit={handleEditSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nombre</Label>
                <Input 
                  value={currentUser.nombreCompleto}
                  onChange={(e) => setCurrentUser({...currentUser, nombreCompleto: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Rol</Label>
                  <Select 
                    value={currentUser.rol}
                    onValueChange={(val) => setCurrentUser({...currentUser, rol: val})}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">Cliente</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select 
                    value={currentUser.activo ? "true" : "false"}
                    onValueChange={(val) => setCurrentUser({...currentUser, activo: val === "true"})}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Activo</SelectItem>
                      <SelectItem value="false">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>Guardar</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};