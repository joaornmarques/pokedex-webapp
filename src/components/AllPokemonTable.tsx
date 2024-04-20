import React from 'react';
import fetchPokemonData from './../utils/fetchPokemonData';

interface AllPokemonTableProps {
  species: { name: string, url: string }[];
}

const showPokemonData = (id: number) => {
  fetchPokemonData(id).then(data => {
    console.log(data)
  })
}

function AllPokemonTable({ species }: AllPokemonTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {species && species.map((pokemon, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{pokemon.name}</td>
            <td>
              <button onClick={() => showPokemonData(index + 1)}>
                info
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AllPokemonTable;