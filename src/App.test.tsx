import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import App from './App';

test('Render all Pokemons', async () => {
  render(<App />);
  await waitFor(() => {
    const firstAndLastPokemon = screen.getAllByText(/bulbasaur|pecharunt/);
    expect(firstAndLastPokemon.length).toBe(2);
  });
});

test('Render Pokemon stats', async () => {
  render(<App />);
  await waitFor(() => {
    const pokemonEntry = screen.getByText('bulbasaur');
    pokemonEntry.click();
  });
  await waitFor(() => {
    expect(screen.getByText('Pokémon Stats')).toBeInTheDocument();
  });
  expect(screen.getByText('hp')).toBeInTheDocument();
  expect(screen.getByText('55')).toBeInTheDocument();
});
