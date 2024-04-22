import { useState, useEffect } from 'react';
import pokeballIcon from './../assets/images/pokeball.png';
import './../assets/styles/pokemon-table.css';
import TableCell from './../components/TableCell';
import Button from './../components/Button';
import getDate from './../utils/getDate';

interface PokemonTableProps {
  species: { name: string, url: string }[];
  savedPokemons: any[];
  catchPokemon: (id: number) => void;
  uncatchPokemon: (id: number) => void;
  openPokemon: (id: number) => void;
}

function PokemonTable({ species, savedPokemons, catchPokemon, uncatchPokemon, openPokemon }: PokemonTableProps) {
  const [showCatched, setShowCatched] = useState<boolean>(false);
  const [listedPokemons, setListedPokemons] = useState<any[]>([]);

  const isPokemonCatched = (id: number) => {
    const pokemon = savedPokemons.find(e => parseInt(e.id) === id)
    return pokemon && pokemon.added_at !== null
  }

  const showAllPokemons = () => {
    setShowCatched(false)
    setListedPokemons(species)
  }

  const showCatchedPokemons = () => {
    setShowCatched(true)
    const filteredPokemons = savedPokemons.filter(pokemon => pokemon.added_at !== null);
    setListedPokemons(filteredPokemons.slice().sort((a, b) => parseInt(a.id) - parseInt(b.id)));
  }

  const uncatchAndUpdateList = (id: number) => {
    uncatchPokemon(id)
    setListedPokemons(listedPokemons.filter(pokemon => parseInt(pokemon.id) !== id));
  }

  useEffect(() => {
    setListedPokemons(species)
  }, [species]);

  return (
    <section className='table-wrapper'>
      <div className='table-toggler'>
        <img src={pokeballIcon} alt='Pokémon catched' className='pokeball-icon'></img>
        <Button
          variant='toggle'
          customClasses={!showCatched ? 'active' : ''}
          onClick={() => showAllPokemons()}
        >
          All
        </Button>
        <Button
          variant='toggle'
          customClasses={showCatched ? 'active' : ''}
          onClick={() => showCatchedPokemons()}
        >
          Catched
        </Button>
      </div>
      <table className='table'>
        <thead>
          <tr className='table__head'>
            <TableCell size='xs' variant='head'/>
            <TableCell size='sm' variant='head'>No.</TableCell>
            <TableCell variant='head'>Name</TableCell>
            {showCatched && (
              <>
                <TableCell size='sm' variant='head'>Ht.</TableCell>
                <TableCell variant='head'>Types</TableCell>
                <TableCell variant='head'>Catched at</TableCell>
              </>
            )}
            <TableCell size='expand' variant='head'/>
          </tr>
        </thead>
        <tbody className='table__body'>
          {listedPokemons && listedPokemons.map((pokemon, index) => (
            <tr key={index} className='table__row'>
              <TableCell size='xs'>{isPokemonCatched(showCatched ? pokemon.id : index + 1) && (
                <img src={pokeballIcon} alt='Pokémon catched' className='pokeball-icon'></img>
              )}</TableCell>
              <TableCell size='sm'>
                {showCatched ? pokemon.id : index + 1}
              </TableCell>
              <TableCell>
                <span className='text-uppercase'>{pokemon.name}</span>
              </TableCell>
              {showCatched && (
                <>
                  <TableCell size='sm'>{pokemon.height}</TableCell>
                  <TableCell>
                    {pokemon.types.map((type: any, index: any) => (
                      <span key={index}>{type.type.name}</span>
                    ))}
                  </TableCell>
                  <TableCell><span className='ts-4'>{getDate(pokemon.added_at)}</span></TableCell>
                </>
              )}
              <TableCell size='expand'>
                <Button onClick={() => openPokemon(showCatched ? pokemon.id : index + 1)}>
                  info
                </Button>
                {isPokemonCatched(showCatched ? pokemon.id : index + 1) ? 
                (
                  <Button onClick={() => uncatchAndUpdateList(showCatched ? pokemon.id : index + 1)}>
                    uncatch
                  </Button>
                ) : (
                  <Button onClick={() => catchPokemon(showCatched ? pokemon.id : index + 1)}>
                    catch
                  </Button>
                )}
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default PokemonTable;