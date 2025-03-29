import AdminLogin from "@/components/AdminLogin";
import useAuth from "@/hooks/use-auth";

import { Navigate, useNavigate } from "react-router-dom"; // Ensure this is the correct import

const Admin = () => {
  const navigate = useNavigate();
  const { loading } = useAuth(); // Ensure useAuth returns these values correctly
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  if (storedUser) navigate("/admin/dashboard", { replace: true });

  return <AdminLogin />;
};

export default Admin;
