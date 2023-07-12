'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Encounter {
  name: string;
  description: string;
  timeCreated: string;
}

export default function Home() {
  const [encounters, setEncounters] = useState<Encounter[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/encounter')
      .then((response) => response.json())
      .then((data) => setEncounters(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      <div>
        <h1 className="p-2 pb-4">Encounters:</h1>
        <ul className="space-y-4">
          {encounters.map((encounter) => (
            <li
              key={encounter.timeCreated}
              className="bg-gray-800 text-slate-200 p-4 rounded shadow"
            >
              <h2 className="text-xl font-bold text-slate-200">{encounter.name}</h2>
              <p>{encounter.description}</p>
              <p className="text-sm text-slate-400 italic">
                Created on: {new Date(encounter.timeCreated).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
