import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    direccion: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const usuarioParaBackend = {
        nombreCompleto: formData.nombreCompleto,
        email: formData.email,
        password: formData.password,
        telefono: formData.telefono,
        direccion: formData.direccion,
        rol: "USER"
      };

      await apiFetch("/usuarios/registro", {
        method: "POST",
        body: JSON.stringify(usuarioParaBackend),
      });

      toast.success("¡Cuenta creada con éxito!");
      navigate("/auth/login");
      
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold">Crear una cuenta</CardTitle>
          <CardDescription>
            Ingresa tus datos para registrarte en RopaPlus
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-2">
              <Label htmlFor="nombreCompleto">Nombre Completo</Label>
              <Input 
                id="nombreCompleto"
                name="nombreCompleto" 
                placeholder="Ej: Juan Pérez" 
                required 
                onChange={handleChange}
                autoComplete="name" // <--- AGREGADO
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input 
                id="email"
                name="email" 
                type="email" 
                placeholder="juan@ejemplo.com" 
                required 
                onChange={handleChange}
                autoComplete="email" // <--- AGREGADO
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input 
                  id="telefono"
                  name="telefono" 
                  placeholder="+56 9 1234 5678" 
                  onChange={handleChange}
                  autoComplete="tel" // <--- AGREGADO
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input 
                  id="direccion"
                  name="direccion" 
                  placeholder="Calle Principal 123" 
                  onChange={handleChange}
                  autoComplete="street-address" // <--- AGREGADO
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password"
                  name="password" 
                  type="password" 
                  required 
                  onChange={handleChange}
                  autoComplete="new-password" // <--- AGREGADO
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input 
                  id="confirmPassword"
                  name="confirmPassword" 
                  type="password" 
                  required 
                  onChange={handleChange}
                  autoComplete="new-password" // <--- AGREGADO
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full mt-4" size="lg" disabled={loading}>
              {loading ? "Creando cuenta..." : "Registrarse"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center border-t pt-6">
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/auth/login" className="text-primary font-semibold hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};