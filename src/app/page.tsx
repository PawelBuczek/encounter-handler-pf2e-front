import Image from 'next/image'

export default function Home() {
  const encounters = [
    {
      name: 'enc1',
      description: 'most epic fight ever',
      timeCreated: '2023-07-12T11:28:54.3676177',
    },
    {
      name: 'enc2',
      description: 'less epic fight',
      timeCreated: '2023-08-12T11:28:54.3676177',
    }
  ];

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
