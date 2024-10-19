import { AppDispatch, RootState } from './store';
import { setSavedPokemons } from './savedPokemonsSlice';
import { setActivePokemon } from './uiSlice';
import fetchPokemonData from '../utils/fetchPokemonData';
import localforage from 'localforage';
import { Pokemon } from '../types';

export const fetchAndAddPokemon = (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { savedPokemons } = getState();
  
  // Check if the Pokemon is already saved
  if (savedPokemons.find((pokemon: Pokemon) => pokemon.id === id)) {
    dispatch(setActivePokemon(savedPokemons.find((pokemon: Pokemon) => pokemon.id === id)));
    return;
  }

  try {
    const data = await fetchPokemonData(id);
    const pokemonData = {
      name: data.name,
      id: data.id,
      height: data.height,
      weight: data.weight,
      stats: data.stats,
      types: data.types,
      image: data.sprites.front_default,
      added_at: null,
      notes: null,
    };

    const updatedPokemons = [...savedPokemons, pokemonData];
    dispatch(setSavedPokemons(updatedPokemons));
    dispatch(setActivePokemon(pokemonData));
    localforage.setItem('savedPokemons', updatedPokemons);
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    // You might want to dispatch an error action here
  }
};