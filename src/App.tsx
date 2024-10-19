import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import localforage from 'localforage';
import './assets/styles/main.css';
import PokemonTable from './components/PokemonTable';
import PokemonDetails from './components/PokemonDetails';
import PokedexStats from './components/PokedexStats';
import fetchPokemonSpecies from './utils/fetchPokemonSpecies';
import pokeballBg from './assets/images/pokeball-bg.svg';
import Button from './components/Button';
import { RootState, AppDispatch, store } from './redux/store';
import { setPokemonSpecies } from './redux/pokemonSpeciesSlice';
import { setSavedPokemons } from './redux/savedPokemonsSlice';
import { setActivePokemon, setStatusPanel, setDetailsPanel } from './redux/uiSlice';
import { fetchAndAddPokemon } from './redux/pokemonThunks';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const pokemonSpecies = useSelector((state: RootState) => state.pokemonSpecies);
  const savedPokemons = useSelector((state: RootState) => state.savedPokemons);
  const { statusPanel } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    const loadLocalData = async () => {
      const localSavedPokemons = await localforage.getItem('savedPokemons');
      const localPokemonSpecies = await localforage.getItem('pokemonSpecies');
      if (localPokemonSpecies) {
        dispatch(setPokemonSpecies(localPokemonSpecies as any[]));
      } else {
        fetchPokemonSpecies().then(data => {
          dispatch(setPokemonSpecies(data));
          localforage.setItem('pokemonSpecies', data);
        }) 
      }
      if (localSavedPokemons) dispatch(setSavedPokemons(localSavedPokemons as any[]));
    }
    loadLocalData()
  }, [dispatch]);

  const openPokemon = (id: number) => {
    dispatch(fetchAndAddPokemon(id));
    dispatch(setDetailsPanel(true));
  }

  const updatePokemonData = async (id: number, timestamp: number | null, notes: string | null) => {
    if (!savedPokemons.some(pokemon => pokemon.id === id)) {
      await dispatch(fetchAndAddPokemon(id));
      // Get the updated savedPokemons after fetching
      const updatedSavedPokemons = (await localforage.getItem('savedPokemons')) as any[];
      updatedSavedPokemons ?? dispatch(setSavedPokemons(updatedSavedPokemons));
    }
    
    // Use the latest savedPokemons from the store
    const latestSavedPokemons = (store.getState() as RootState).savedPokemons;
    
    const updatedPokemons = latestSavedPokemons.map(pokemon => 
      pokemon.id === id ? { ...pokemon, added_at: timestamp, notes: notes } : pokemon
    );
    dispatch(setSavedPokemons(updatedPokemons));
    localforage.setItem('savedPokemons', updatedPokemons);
  }

  const catchPokemon = (id: number) => {
    updatePokemonData(id, Date.now(), null);
    dispatch(setActivePokemon(savedPokemons.find(pokemon => pokemon.id === id)));
  }

  const uncatchPokemon = (id: number) => {
    updatePokemonData(id, null, null);
    dispatch(setActivePokemon(undefined));
  }

  const toggleStatusPanel = () => {
    dispatch(setStatusPanel(!statusPanel));
  }

  return (
    <div className='main-container'>
      <img className='pokeball-bg' src={pokeballBg} alt="Pokédex"/>
      <div className='status-toggler-container'>
        <Button size='sm' onClick={() => toggleStatusPanel()}>
          {statusPanel ? '❮ Pokemons' : 'Progress ❯'}
        </Button>
      </div>
      <PokedexStats />
      <PokemonTable key={pokemonSpecies.length} openPokemon={openPokemon} catchPokemon={catchPokemon} uncatchPokemon={uncatchPokemon} />
      <PokemonDetails />
    </div>
  );
}

export default App;