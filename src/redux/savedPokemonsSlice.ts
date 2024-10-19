import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from './../types';

const initialState: Pokemon[] = [];

const savedPokemonsSlice = createSlice({
  name: 'savedPokemons',
  initialState,
  reducers: {
    setSavedPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      return action.payload;
    },
    addSavedPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.push(action.payload);
    },
    updateSavedPokemon: (state, action: PayloadAction<Pokemon>) => {
      const index = state.findIndex(pokemon => pokemon.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    updatePokemonNotes: (state, action: PayloadAction<{ id: number, notes: string }>) => {
      const { id, notes } = action.payload;
      const pokemonIndex = state.findIndex(pokemon => pokemon.id === id);
      if (pokemonIndex !== -1) {
        state[pokemonIndex].notes = notes;
      }
    },
  },
});

export const { setSavedPokemons, addSavedPokemon, updateSavedPokemon, updatePokemonNotes } = savedPokemonsSlice.actions;
export default savedPokemonsSlice.reducer;
