import { configureStore } from '@reduxjs/toolkit';
import pokemonSpeciesReducer from './pokemonSpeciesSlice';
import savedPokemonsReducer from './savedPokemonsSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    pokemonSpecies: pokemonSpeciesReducer,
    savedPokemons: savedPokemonsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
