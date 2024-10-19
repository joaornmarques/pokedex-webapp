import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import pokeballIcon from './../assets/images/pokeball.png';
import pokeballBg from './../assets/images/pokeball-bg.svg';
import './../assets/styles/pokemon-table.css';
import TableCell from './../components/TableCell';
import Button from './../components/Button';
import getDate from './../utils/getDate';
import { RootState } from '../redux/store';

interface PokemonTableProps {
  openPokemon: (id: number) => void;
  catchPokemon: (id: number) => void;
  uncatchPokemon: (id: number) => void;
}

function PokemonTable({ openPokemon, catchPokemon, uncatchPokemon }: PokemonTableProps) {
  const pokemonSpecies = useSelector((state: RootState) => state.pokemonSpecies);
  const savedPokemons = useSelector((state: RootState) => state.savedPokemons);
  const { activePokemon, statusPanel } = useSelector((state: RootState) => state.ui);

  const [showCatched, setShowCatched] = useState<boolean>(false);
  const [activeSort, setActiveSort] = useState<string>('');
  const [listedPokemons, setListedPokemons] = useState<any[]>(pokemonSpecies);

  useEffect(() => {
    setListedPokemons(pokemonSpecies);
  }, [pokemonSpecies]);

  const isPokemonCatched = (id: number) => {
    const pokemon = savedPokemons.find(e => e.id === id)
    return pokemon && pokemon.added_at !== null
  }

  const showAllPokemons = () => {
    setShowCatched(false)
    setListedPokemons(pokemonSpecies)
  }

  const showCatchedPokemons = () => {
    setShowCatched(true)
    const filteredPokemons = savedPokemons.filter(pokemon => pokemon.added_at !== null);
    setListedPokemons(filteredPokemons.slice().sort((a, b) => a.id - b.id));
  }

  const isPokemonActive = (id: number) => {
    return id === activePokemon?.id
  }

  const reorderPokemon = (param: string) => {
    if (showCatched) {
      const sortedPokemons = [...listedPokemons].sort((a, b) => a[param] - b[param]);
      setListedPokemons(sortedPokemons)
    }
    setActiveSort(param);
  }

  return (
    <section className={`table-wrapper ${!statusPanel ? 'table-wrapper--active' : ''}`}>
      <div className='table-toggler'>
        <img src={pokeballBg} alt='Show Pokémon' className='pokeball-icon'></img>
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
            <TableCell
              size='sm'
              variant={showCatched ? 'head-selectable' : 'head'}
              onClick={() => reorderPokemon('id')}
            >
              No.{activeSort === 'id' ? '▼' : ''}
            </TableCell>
            <TableCell variant='head'>Name</TableCell>
            {showCatched && (
              <>
                <TableCell
                  size='sm'
                  variant='head-selectable'
                  onClick={() => reorderPokemon('height')}
                >
                  Ht.{activeSort === 'height' ? '▼' : ''}
                </TableCell>
                <TableCell variant='head'>Types</TableCell>
                <TableCell
                  variant='head-selectable'
                  onClick={() => reorderPokemon('added_at')}
                >
                  Catched at{activeSort === 'added_at' ? '▼' : ''}
                </TableCell>
              </>
            )}
            <TableCell size='expand' variant='head'/>
          </tr>
        </thead>
        <tbody className='table__body'>
          {listedPokemons.map((pokemon, index) => (
            <tr
              key={showCatched ? pokemon.id : index}
              className={`table__row ${isPokemonActive(showCatched ? pokemon.id : index + 1) ? 'table__row--active' : ''}`}
              onClick={() => openPokemon(showCatched ? pokemon.id : index + 1)}
            >
              <TableCell size='xs'>{isPokemonCatched(showCatched ? pokemon.id : index + 1) && (
                <img src={pokeballIcon} alt='Pokémon catched' className='pokeball-icon'></img>
              )}</TableCell>
              <TableCell size='sm'>
                {showCatched ? pokemon.id : index + 1}&nbsp;
              </TableCell>
              <TableCell variant='name'>
                <span className='text-uppercase fw-700'>{pokemon.name}</span>
              </TableCell>
              {showCatched && (
                <>
                  <TableCell size='sm' variant='show-xl'>{pokemon.height}</TableCell>
                  <TableCell variant='show-xl'>
                    {pokemon.types.map((type: any, index: number) => (
                      <span key={index} className='tag tag--table'>{type.type.name}</span>
                    ))}
                  </TableCell>
                  <TableCell variant='timespan'><span className='ts-4'>{getDate(pokemon.added_at)}</span></TableCell>
                </>
              )}
              <TableCell size='expand'>
                {isPokemonCatched(showCatched ? pokemon.id : index + 1) ? 
                (
                  <Button variant='uncatch' onClick={(event) => { event.stopPropagation(); uncatchPokemon(showCatched ? pokemon.id : index + 1)}}>
                    <img src={pokeballBg} alt='uncatch pokemon' className='button__icon' />
                    Uncatch
                  </Button>
                ) : (
                  <Button variant='catch' onClick={(event) => { event.stopPropagation(); catchPokemon(showCatched ? pokemon.id : index + 1)}}>
                    <img src={pokeballBg} alt='catch pokemon' className='button__icon' />
                    Catch
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