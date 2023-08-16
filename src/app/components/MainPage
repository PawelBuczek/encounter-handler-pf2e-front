import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <PrivateRoute path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ element }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // You need to implement your authentication logic

  // Check for a 401 Unauthorized response or any other authentication logic here
  useEffect(() => {
    // Simulate a 401 response
    setIsAuthenticated(false);
  }, []);

  return isAuthenticated ? element : <Navigate to="/login" />;
}

function MainPage() {
  return <h1>Main Page</h1>;
}

export default App;
