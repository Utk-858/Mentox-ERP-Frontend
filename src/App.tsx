import React from "react";
import { AuthProvider } from "./lib/AuthProvider";
import AppRoutes from './routes'
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
