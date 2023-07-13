import React, { useState, useEffect } from 'react';
import './EncounterTable.css';

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
    <main>
      <div className="encounter-table-container">
        <h1 className="table-heading">Encounters</h1>
        <table className="encounter-table">
          <thead>
            <tr>
              {['name', 'description', 'timeCreated'].map((field) => (
                <th
                  key={field}
                  onClick={() => handleSort(field as keyof Encounter)}
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
              <tr key={encounter.timeCreated}>
                {['name', 'description', 'timeCreated'].map((field) => (
                  <td key={field}>
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
