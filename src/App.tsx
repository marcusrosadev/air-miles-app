import React from 'react';
import AppRouter from './routes/appRouter';
import { AuthProvider } from './contexts/auth/authContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
