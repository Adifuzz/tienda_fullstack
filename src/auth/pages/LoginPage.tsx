import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/auth/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { toast } from "sonner";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const usuarioLogueado = await login(email, password);
      toast.success(`Bienvenido de nuevo, ${usuarioLogueado.nombreCompleto}`);

      if (usuarioLogueado.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      toast.error("Credenciales incorrectas o error de conexión");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 px-4">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Iniciar Sesión
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Ingresa tu correo y contraseña para continuar
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input 
                id="email" // Importante para accesibilidad
                type="email"
                placeholder="nombre@ejemplo.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                required
                className="bg-background"
                autoComplete="email" // <--- AGREGADO
              />
            </div>
            <div className="space-y-2">
              <Input 
                id="password" // Importante para accesibilidad
                type="password" 
                placeholder="Contraseña" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                required
                className="bg-background"
                autoComplete="current-password" // <--- AGREGADO
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full font-semibold" 
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 border-t p-6 bg-muted/20">
          <p className="text-sm text-center text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link 
              to="/auth/registro" 
              className="text-primary font-medium hover:underline transition-all"
            >
              Regístrate aquí
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};