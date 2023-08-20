import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRouteWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // You need to implement your authentication logic

  // Check for a 401 Unauthorized response or any other authentication logic here
  useEffect(() => {
    // Simulate a 401 response
    setIsAuthenticated(false);
  }, []);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function PrivateRouteWrapper() {
  return <PrivateRoute><MainPage /></PrivateRoute>;
}

function MainPage() {
  return <h1>Main Page</h1>;
}

export default App;
