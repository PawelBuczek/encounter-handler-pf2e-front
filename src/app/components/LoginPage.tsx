import React, { useState, ChangeEvent } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Simulate a login check
    // need to send request to http://localhost:8080/login after this endpoint is done (OAuth 2.0)
    if (username === 'user' && password === 'password') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (loggedIn) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl">Welcome, {username}!</h1>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl text-black mb-4">Login Form</h1>
        <div className="mb-4">
          <label className="block text-gray-600">Username:</label>
          <input
            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Password:</label>
          <input
            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
