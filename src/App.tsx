import AppRoutes from "./Routes";

import { AuthProvider } from "@/contexts/AuthProvider";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
