
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Ghost, ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-background to-muted/50 px-4">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 glow opacity-50"></div>
      <div className="absolute bottom-1/4 right-1/4 glow opacity-50"></div>
      
      <div className="max-w-md w-full mx-auto text-center relative z-10">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Ghost className="h-32 w-32 text-primary/80 animate-float" />
            <span className="absolute -top-2 -right-2 text-4xl">👻</span>
          </div>
        </div>
        
        <h1 className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">404</h1>
        <h2 className="text-2xl font-medium mb-6 text-foreground/90">Page not found</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Oops! It seems the page you're looking for has vanished into thin air.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.history.back()}
            className="group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </Button>
          <Button
            size="lg" 
            asChild
            className="group"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Fun fact section */}
      <div className="mt-16 text-center max-w-md mx-auto">
        <p className="text-sm text-muted-foreground border-t border-border pt-4">
          <span className="font-medium">Fun fact:</span> The term "404" comes from the HTTP status code for "Not Found" - when a server can't locate the requested page.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
