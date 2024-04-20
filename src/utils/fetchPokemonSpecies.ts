const fetchPokemonSpecies = async () => {
  let response = await fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=2000');
  let data = await response.json();
  return data.results;
};

export default fetchPokemonSpecies;