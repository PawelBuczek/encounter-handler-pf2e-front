'use client'

import React, { useState } from 'react';
import EncounterTable from './components/EncounterTable';
import LoginPage from './components/LoginPage';


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state is not logged in

  return (
    <main>
      {/* {isLoggedIn ? <EncounterTable /> : <LoginPage />} */}
      <LoginPage />
    </main>
  );
}
