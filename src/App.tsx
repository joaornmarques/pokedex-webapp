import React, { useState, useEffect } from 'react';
import './App.css';
import AllPokemonTable from './components/AllPokemonTable';
import fetchPokemonSpecies from './utils/fetchPokemonSpecies';

function App() {
  const [pokemonSpecies, setPokemonSpecies] = useState<{ name: string, url: string }[]>([]);

  useEffect(() => {
    fetchPokemonSpecies().then(data => setPokemonSpecies(data))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <AllPokemonTable species={pokemonSpecies} />
      </header>
    </div>
  );
}

export default App;
