
interface AllPokemonTableProps {
  species: { name: string, url: string }[];
  savedPokemons: any[];
  catchPokemon: (id: number) => void;
  uncatchPokemon: (id: number) => void;
  openPokemon: (id: number) => void;
}

function AllPokemonTable({ species, savedPokemons, catchPokemon, uncatchPokemon, openPokemon }: AllPokemonTableProps) {

  const isPokemonCatched = (id: number) => {
    const pokemon = savedPokemons.find(e => parseInt(e.id) === id)
    return pokemon && pokemon.added_at !== null
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>No.</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {species && species.map((pokemon, index) => (
          <tr key={index}>
            <td>{isPokemonCatched(index + 1) && '🔴'}</td>
            <td>{index + 1}</td>
            <td>
              {pokemon.name}&nbsp;
            </td>
            <td>
              <button onClick={() => openPokemon(index + 1)}>
                info
              </button>
              {isPokemonCatched(index + 1) ? 
              (
                <button onClick={() => uncatchPokemon(index + 1)}>
                  uncatch
                </button>
              ) : (
                <button onClick={() => catchPokemon(index + 1)}>
                  catch
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AllPokemonTable;