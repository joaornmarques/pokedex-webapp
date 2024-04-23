import { useState, useEffect } from 'react';
import localforage from 'localforage';
import './assets/styles/main.css';
import PokemonTable from './components/PokemonTable';
import PokemonDetails from './components/PokemonDetails';
import PokedexStats from './components/PokedexStats';
import fetchPokemonSpecies from './utils/fetchPokemonSpecies';
import fetchPokemonData from './utils/fetchPokemonData';
import pokeballBg from './assets/images/pokeball-bg.svg';
import Button from './components/Button';

interface Pokemon {
  name: string;
  id: number;
  height: number;
  weight: number;
  stats: any[]; // Define the type for stats
  types: any[]; // Define the type for types
  image: string;
  added_at: number | null;
  notes: string | null;
}

function App() {
  const [pokemonSpecies, setPokemonSpecies] = useState<{ name: string, url: string }[]>([]);
  const [savedPokemons, setSavedPokemons] = useState<any[]>([]);
  const [activePokemon, setActivePokemon] = useState<Pokemon | undefined>(undefined);
  const [statusPanel, setStatusPanel] = useState<boolean>(false);
  const [detailsPanel, setDetailsPanel] = useState<boolean>(false);

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
      const pokemonData = {
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
      const updatedPokemons = [...savedPokemons, pokemonData];
      setSavedPokemons(updatedPokemons);
      setActivePokemon(pokemonData);
      localforage.setItem('savedPokemons', updatedPokemons);
    });
  }

  const setActivePokemonById = (id: number) => {
    setActivePokemon(savedPokemons.find(pokemon => parseInt(pokemon.id) === id));
  }

  const openPokemon = (id: number) => {
    if(savedPokemons.find(pokemon => parseInt(pokemon.id) === id)) {
      setActivePokemonById(id);
    } else {
      savePokemonData(id, null, null);
    }
    setDetailsPanel(true);
  }

  const updatePokemonData = (id: number, timestamp: number | null, notes: string | null) => {
    const updatedPokemons = [...savedPokemons];
    updatedPokemons[id] = { ...savedPokemons[id], added_at: timestamp, notes: notes};
    setSavedPokemons(updatedPokemons);
    localforage.setItem('savedPokemons', updatedPokemons);
  }

  const savedPokemonIndex = (id: number) => {
    return savedPokemons.findIndex(pokemon => parseInt(pokemon.id) === id);
  }

  const catchPokemon = (id: number) => {
    const localIndex = savedPokemonIndex(id);
    if(localIndex !== -1) {
      const pokemonData = savedPokemons.find(pokemon => parseInt(pokemon.id) === id);
      updatePokemonData(localIndex, Date.now(), pokemonData.notes);
    } else {
      savePokemonData(id, Date.now(), null);
    }
    setActivePokemonById(id);
  }

  const uncatchPokemon = (id: number) => {
    const localIndex = savedPokemonIndex(id);
    if(localIndex !== -1) {
      const pokemonData = savedPokemons.find(pokemon => parseInt(pokemon.id) === id);
      updatePokemonData(localIndex, null, pokemonData.notes);
    }
    setActivePokemon(undefined);
  }

  const updatePokemonNotes = (id: number, timestamp: number | null, notes: string | null) => {
    updatePokemonData(savedPokemonIndex(id), timestamp, notes);
  }

  const resetPokedex = () => {
    if (window.confirm('Do you want to reset your Pokédex? This action is nor reversible.') === true) {
      setSavedPokemons([]);
      setActivePokemon(undefined);
      localforage.setItem('savedPokemons', []);
    }
  }

  const toggleStatusPanel = () => {
    setStatusPanel(!statusPanel)
  }

  const closeDetailsPanel = () => {
    setDetailsPanel(false);
    setActivePokemon(undefined);
  }

  return (
    <div className='main-container'>
      <img className='pokeball-bg' src={pokeballBg} alt="Pokédex"/>
      <div className='status-toggler-container'>
        <Button size='sm' onClick={() => toggleStatusPanel()}>
          {statusPanel ? '❮ Pokemons' : 'Progress ❯'}
        </Button>
      </div>
      <PokedexStats
        totalPokemons={pokemonSpecies.length}
        savedPokemons={savedPokemons}
        resetPokedex={resetPokedex}
        showStatsMobile={statusPanel}
      />
      <PokemonTable
        species={pokemonSpecies}
        savedPokemons={savedPokemons}
        activePokemonId={activePokemon?.id || null}
        openPokemon={openPokemon}
        catchPokemon={catchPokemon}
        uncatchPokemon={uncatchPokemon}
        showTableMobile={!statusPanel}
      />
      <PokemonDetails
        pokemon={activePokemon}
        updatePokemonNotes={updatePokemonNotes}
        showDetailsMobile={detailsPanel}
        closeDetailsMobile={() => closeDetailsPanel()}
      />
    </div>
  );
}

export default App;
