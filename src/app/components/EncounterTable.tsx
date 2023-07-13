import React, { useState, useEffect } from 'react';

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
      .then((response) => response.json())
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
    <main self-center>
      <div className="self-center w-500 mx-auto p-20">
        <h1 className="text-3xl font-bold mb-6">Encounters</h1>
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
                    <span className={`ml-2 ${sortConfig.direction === 'ascending' ? 'rotate-180' : ''}`}>
                      ▲
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
