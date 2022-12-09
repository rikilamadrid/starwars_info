import React, { useState } from 'react';
import Planet from './Planet';
import { usePaginatedQuery } from 'react-query';

const fetchPlanets = async (key, page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

export default function Planets() {
  const [page, setPage] = useState(1);
  const {
    resolvedData,
    latestData,
    status,
  } = usePaginatedQuery(['planets', page], fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>

      {status === 'loading' && (
        <div>Loadig data...</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
        <>
        <button
          onClick={() => setPage(old => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <span>{ page }</span>
        <button
          onClick={() => setPage(old => (!latestData || !latestData.next ? old : old + 1))}
          disabled={!latestData || !latestData.next}
        >
          Next Page
        </button>
          <div>
            {resolvedData.results.map((planet) => {
              return (
                <Planet key={planet.name} planet={planet} />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
