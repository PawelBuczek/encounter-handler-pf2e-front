'use client'
import {options} from "../app/api/auth"
import {getServerSession} from "next-auth/next"

import React from 'react';
import EncounterTable from './components/EncounterTable';

async function page(){
  const session = await getServerSession(options)
  console.log(session.user)
}

export default function Home() {

  return (
    <main>
      <EncounterTable />
    </main>
  );
}

