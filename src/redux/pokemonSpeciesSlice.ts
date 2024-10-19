import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonSpecies {
  name: string;
  url: string;
}

const initialState: PokemonSpecies[] = [];

const pokemonSpeciesSlice = createSlice({
  name: 'pokemonSpecies',
  initialState,
  reducers: {
    setPokemonSpecies: (state, action: PayloadAction<PokemonSpecies[]>) => {
      return action.payload;
    },
  },
});

export const { setPokemonSpecies } = pokemonSpeciesSlice.actions;
export default pokemonSpeciesSlice.reducer;
