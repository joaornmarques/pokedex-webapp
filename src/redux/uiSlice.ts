import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from './../types';

interface UIState {
  activePokemon: Pokemon | undefined;
  statusPanel: boolean;
  detailsPanel: boolean;
}

const initialState: UIState = {
  activePokemon: undefined,
  statusPanel: false,
  detailsPanel: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActivePokemon: (state, action: PayloadAction<Pokemon | undefined>) => {
      state.activePokemon = action.payload;
    },
    setStatusPanel: (state, action: PayloadAction<boolean>) => {
      state.statusPanel = action.payload;
    },
    setDetailsPanel: (state, action: PayloadAction<boolean>) => {
      state.detailsPanel = action.payload;
    },
  },
});

export const { setActivePokemon, setStatusPanel, setDetailsPanel } = uiSlice.actions;
export default uiSlice.reducer;
