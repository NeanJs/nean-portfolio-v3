import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AllProjects from "./pages/AllProjects";
import Admin from "./pages/Admin";
import AdminPanel from "./components/AdminPanel";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { Provider } from "react-redux";
import { store } from "./lib/store/store";
import AdminProjects from "./components/AdminProjects";

const App = () => (
  <Provider store={store}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<AllProjects />} />

          {/* Admin Routes */}

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin" element={<AdminPanel />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route
              path="media"
              element={
                <div className="p-4">Media Library (To be implemented)</div>
              }
            />
            <Route
              path="messages"
              element={<div className="p-4">Messages (To be implemented)</div>}
            />
            <Route
              path="profile"
              element={
                <div className="p-4">Profile Settings (To be implemented)</div>
              }
            />
            <Route
              path="analytics"
              element={<div className="p-4">Analytics (To be implemented)</div>}
            />
            <Route
              path="settings"
              element={
                <div className="p-4">Site Settings (To be implemented)</div>
              }
            />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </Provider>
);

export default App;
