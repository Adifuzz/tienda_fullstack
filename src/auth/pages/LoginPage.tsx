import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/auth/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // CAMBIO 3: Capturamos el usuario que devuelve el login
      const usuarioLogueado = await login(email, password);
      
      toast.success(`Bienvenido ${usuarioLogueado.nombreCompleto}`);

      // CAMBIO 4: Lógica de decisión
      // Si el rol es ADMIN -> Panel de Administración
      // Si no (es USER) -> Página Principal (Home)
      if (usuarioLogueado.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/"); 
      }

    } catch (error) {
      console.error(error);
      toast.error("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
            />
            <Input 
              type="password" 
              placeholder="Contraseña" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t p-4">
          <p className="text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link to="/auth/registro" className="text-primary font-bold hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};