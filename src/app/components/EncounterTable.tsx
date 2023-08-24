import React, { useState, useEffect } from 'react';
import router from 'next/router';

interface Encounter {
  name: string;
  description: string;
  timeCreated: string;
  [key: string]: string; // Add index signature
}

type SortDirection = 'ascending' | 'descending';

type SortConfig = {
  field: keyof Encounter;
  direction: SortDirection;
};

const defaultSortConfig: SortConfig = {
  field: 'name',
  direction: 'ascending',
};

const EncounterTable: React.FC = () => {
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>(defaultSortConfig);

  useEffect(() => {
    fetch('http://localhost:8080/encounter')
      .then((response) => {
        // debugger;
        if (response.status === 401) {
          router.push('/login');
        } else if (response.json() == null){
          return [];
        } else {
          return response.json();
        }
      })
      .then((data) => setEncounters(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSort = (field: keyof Encounter) => {
    setSortConfig((prevSortConfig) => ({
      field,
      direction:
        prevSortConfig.field === field
          ? prevSortConfig.direction === 'ascending'
            ? 'descending'
            : 'ascending'
          : 'ascending',
    }));
  };

  const sortedEncounters = [...encounters].sort((a, b) => {
    const { field, direction } = sortConfig;
    return direction === 'ascending'
      ? a[field].localeCompare(b[field])
      : b[field].localeCompare(a[field]);
  });

  return (
    <main>
      <div className="grid place-items-center">
        <h1 className="text-3xl font-bold mb-6 my-5">Encounters</h1>
        <table className="border-collapse">
          <thead>
            <tr>
              {['name', 'description', 'timeCreated'].map((field) => (
                <th
                  key={field}
                  onClick={() => handleSort(field as keyof Encounter)}
                  className="bg-gray-100 text-gray-700 font-bold py-3 px-4 cursor-pointer"
                >
                  <span>{field}</span>
                  {sortConfig.field === field && (
                    <span className={`sort-icon ${sortConfig.direction}`}>
                      {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedEncounters.map((encounter) => (
              <tr key={encounter.timeCreated} className="bg-gray-900">
                {['name', 'description', 'timeCreated'].map((field) => (
                  <td
                    key={field}
                    className="py-3 px-4 border-b border-gray-700"
                  >
                    {field === 'timeCreated'
                      ? new Date(encounter[field]).toLocaleString()
                      : encounter[field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default EncounterTable;
