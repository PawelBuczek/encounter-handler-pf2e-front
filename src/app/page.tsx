'use client'

import React, { useEffect } from 'react';
import EncounterTable from './components/EncounterTable';
import { options } from "../app/api/auth/route";
import { getServerSession } from "next-auth/next";

export default function Home() {
  useEffect(() => {
    async function page() {
      try {
        const session: any = await getServerSession(options);
        console.log(session.user);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    }

    // Call the page function when the component mounts
    page();
  }, []);

  return (
    <main>
      <EncounterTable />
    </main>
  );
}
