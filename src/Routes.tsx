import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Login, Dashboard } from "@/pages";

import { useAuth } from "@/contexts/AuthProvider";

const AppRoutes = () => {
  const { isUserLogged } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* =============================================================== */}

        <Route path="/" element={<Navigate to="/entrar" />} />
        <Route path="*" element={<Navigate to="/entrar" />} />

        {/* =============================================================== */}
        {/* 
        <Route path="/entrar" element={<Login />} />
        <Route path="/painel" element={<Dashboard />} /> */}

        <Route
          path="/entrar"
          element={
            <PublicRoute isAuthenticated={isUserLogged}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/painel"
          element={
            <PrivateRoute isAuthenticated={isUserLogged}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* =============================================================== */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

// =========================================== ROUTES

interface RouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const PrivateRoute = ({ isAuthenticated, children }: RouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/entrar" replace />;
  }

  return children;
};

const PublicRoute = ({ isAuthenticated, children }: RouteProps) => {
  if (isAuthenticated) {
    return <Navigate to="/painel" />;
  }

  return children;
};
