import { useState, useEffect } from 'react';
import localforage from 'localforage';
import './assets/styles/main.css';
import PokemonTable from './components/PokemonTable';
import PokedexStats from './components/PokedexStats';
import fetchPokemonSpecies from './utils/fetchPokemonSpecies';
import fetchPokemonData from './utils/fetchPokemonData';
import pokeballBg from './assets/images/pokeball-bg.svg';

function App() {
  const [pokemonSpecies, setPokemonSpecies] = useState<{ name: string, url: string }[]>([]);
  const [savedPokemons, setSavedPokemons] = useState<any[]>([]);

  useEffect(() => {
    const loadLocalData = async () => {
      const localSavedPokemons = await localforage.getItem('savedPokemons');
      const localPokemonSpecies = await localforage.getItem('pokemonSpecies');
      if (localSavedPokemons) setSavedPokemons(localSavedPokemons as any[]);
      if (localPokemonSpecies) {
        setPokemonSpecies(localPokemonSpecies as any[]);
      } else {
        fetchPokemonSpecies().then(data => {
          setPokemonSpecies(data);
          localforage.setItem('pokemonSpecies', data);
        }) 
      }
    }
    loadLocalData()
  }, []);

  const savePokemonData = (id: number, timestamp: null | number, notes: null | string) => {
    fetchPokemonData(id).then(data => {
      const updatedPokemons = [
        ...savedPokemons,
        {
          name: data.name,
          id: data.id,
          height: data.height,
          weight: data.weight,
          stats: data.stats,
          types: data.types,
          image: data.sprites.front_default,
          added_at: timestamp,
          notes: notes,
        }
      ];

      setSavedPokemons(updatedPokemons);
      localforage.setItem('savedPokemons', updatedPokemons);
    });
  }

  const updatePokemonData = (id: number, timestamp: null | number, notes: null | string) => {
    const updatedPokemons = [...savedPokemons];
    updatedPokemons[id] = { ...savedPokemons[id], added_at: timestamp, notes: notes};
    setSavedPokemons(updatedPokemons);
    localforage.setItem('savedPokemons', updatedPokemons);
  }

  const openPokemon = (id: number) => {
    savePokemonData(id, null, null);
    // open pokemon panel
  }

  const savedPokemonIndex = (id: number) => {
    return savedPokemons.findIndex(pokemon => parseInt(pokemon.id) === id);
  }

  const catchPokemon = (id: number) => {
    const localIndex = savedPokemonIndex(id);
    if(localIndex !== -1) {
      updatePokemonData(localIndex, Date.now(), null);
    } else {
      savePokemonData(id, Date.now(), null);
    }
    console.log(savedPokemons)
  }

  const uncatchPokemon = (id: number) => {
    const localIndex = savedPokemonIndex(id);
    if(localIndex !== -1) {
      updatePokemonData(localIndex, null, null);
    }
    console.log(savedPokemons)
  }

  return (
    <div className='main-container'>
      <img className='pokeball-bg' src={pokeballBg} alt="Pokédex"/>
      <PokedexStats />
      <PokemonTable
        species={pokemonSpecies}
        savedPokemons={savedPokemons}
        openPokemon={openPokemon}
        catchPokemon={catchPokemon}
        uncatchPokemon={uncatchPokemon}
      />
    </div>
  );
}

export default App;
