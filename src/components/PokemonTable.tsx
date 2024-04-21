import pokeballIcon from './../assets/images/pokeball.png';
import './../assets/styles/pokemon-table.css';

interface PokemonTableProps {
  species: { name: string, url: string }[];
  savedPokemons: any[];
  catchPokemon: (id: number) => void;
  uncatchPokemon: (id: number) => void;
  openPokemon: (id: number) => void;
}

function PokemonTable({ species, savedPokemons, catchPokemon, uncatchPokemon, openPokemon }: PokemonTableProps) {

  const isPokemonCatched = (id: number) => {
    const pokemon = savedPokemons.find(e => parseInt(e.id) === id)
    return pokemon && pokemon.added_at !== null
  }

  return (
    <section className='table-wrapper'>
      <table className='table'>
        <thead>
          <tr>
            <th></th>
            <th>No.</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='table__body'>
          {species && species.map((pokemon, index) => (
            <tr key={index}>
              <td>{isPokemonCatched(index + 1) && (
                <img src={pokeballIcon} alt='Pokémon catched' style={{ width: '24px' }}></img>
              )}</td>
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
    </section>
  );
}

export default PokemonTable;