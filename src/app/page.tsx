'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import React from 'react';
import EncounterTable from './components/EncounterTable';


export default function Home() {

  return (
    <main self-center content-center>
      <EncounterTable />
    </main>
  );
}
