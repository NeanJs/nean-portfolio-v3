import * as React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.config";
import { toast } from "./use-toast";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  email: string;
  password: string;
}

const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<object | null>(null);

  const login = async ({ email, password }: AuthProps): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      await navigate("/admin/dashboard", { replace: true });
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
    } catch (err) {
      setError(err.message);
      toast({
        title: "Login failed",
        description: error,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, user };
};

export default useAuth;
export type { AuthProps };
