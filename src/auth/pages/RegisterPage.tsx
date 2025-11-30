import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "@/lib/api"; // Tu cliente HTTP
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Estado del formulario
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
    
    // Validación básica de contraseñas
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

      // 2. Llamada a la API
      await apiFetch("/usuarios/registro", {
        method: "POST",
        body: JSON.stringify(usuarioParaBackend),
      });

      toast.success("Cuenta creada exitosamente");
      // 3. Redirigir al Login para que inicie sesión
      navigate("/auth/login");
      
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Crear Cuenta</CardTitle>
          <CardDescription>Únete a RopaPlus para empezar a comprar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input 
                name="nombreCompleto" 
                placeholder="Nombre Completo" 
                required 
                onChange={handleChange} 
              />
            </div>
            <div className="space-y-2">
              <Input 
                name="email" 
                type="email" 
                placeholder="Correo Electrónico" 
                required 
                onChange={handleChange} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input 
                  name="telefono" 
                  placeholder="Teléfono" 
                  onChange={handleChange} 
                />
                <Input 
                  name="direccion" 
                  placeholder="Dirección" 
                  onChange={handleChange} 
                />
            </div>
            <div className="space-y-2">
              <Input 
                name="password" 
                type="password" 
                placeholder="Contraseña" 
                required 
                onChange={handleChange} 
              />
            </div>
            <div className="space-y-2">
              <Input 
                name="confirmPassword" 
                type="password" 
                placeholder="Confirmar Contraseña" 
                required 
                onChange={handleChange} 
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link to="/auth/login" className="text-primary font-medium hover:underline">
              Inicia sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};