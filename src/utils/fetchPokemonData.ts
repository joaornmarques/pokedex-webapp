const fetchPokemonData = async (id: number) => {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let data = await response.json();
  return data;
}

export default fetchPokemonData;