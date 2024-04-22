import { useState, useEffect } from 'react';
import './../assets/styles/pokemon-details.css';
import pokeballIcon from './../assets/images/pokeball.png';
import getDate from './../utils/getDate';
import debounce from './../utils/debounce';

interface PokemonDetailsProps {
  pokemon: {
    name: string;
    id: number;
    height: number;
    weight: number;
    stats: any[];
    types: any[];
    image: string;
    added_at: number | null;
    notes: string | null;
  } | undefined,
  updatePokemonNotes: (id: number, timestamp: number | null, notes: string) => void;
}

function PokemonDetails({pokemon, updatePokemonNotes}: PokemonDetailsProps) {
  const [curPokemon, setCurPokemon] = useState(pokemon);

  useEffect(() => {
    setCurPokemon(pokemon);
    console.log(pokemon);
  }, [pokemon]);

  const debouncedUpdateNotes = debounce((id: number, added_at: number | null, notes: string) => {
    updatePokemonNotes(id, added_at, notes);
  }, 1000);

  const updateNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = (e.target as HTMLTextAreaElement).value
    if(curPokemon) {
      debouncedUpdateNotes(curPokemon.id, curPokemon.added_at || null, newNotes);
    }
  }

  return (
    <section className='details-panel'>
      {curPokemon && (
        <>
          <div className='details-header'>
            <img src={curPokemon.image} alt={curPokemon.name} className='details-header__img' />
            <div className='details-header__info'>
              <p className='m-0 mb-8'>
                <span className='ts-4 fw-700'>No.{curPokemon.id}</span>&nbsp;
                <span className='ts-3 text-uppercase'>{curPokemon.name}</span>
              </p>
              <div className='flex mb-8'>
                <p className='m-0 ts-4 mr-8'>
                  <span>Height:</span>&nbsp;
                  <span className='fw-700'>{curPokemon.height}</span>
                </p>
                <p className='m-0 ts-4'>
                  <span>Weight:</span>&nbsp;
                  <span className='fw-700'>{curPokemon.weight}</span>
                </p>
              </div>
              <div className='flex align-center mb-8'>
                <span className='m-0 ts-4'>Types:</span>&nbsp;
                {curPokemon.types.map((type, index) => (
                  <span key={index} className='tag'>{type.type.name}</span>
                ))}
              </div>
              <p key={curPokemon ? curPokemon.added_at : 'default'} className='flex align-center m-0 ts-4'>
                {curPokemon.added_at ? (
                  <>
                    <img src={pokeballIcon} alt='Pokémon catched' className='pokeball-icon pokeball-icon--sm'></img>
                    Catched at: {getDate(curPokemon.added_at)}
                  </>
                ) : 'Not catched yet'}</p>
            </div>
          </div>
          {curPokemon.stats.map((stat, index) => (
            <p key={index}>{stat.stat.name}: {stat.base_stat}</p>
          ))}
          <textarea
            key={curPokemon ? curPokemon.id : 'default'}
            defaultValue={curPokemon.notes || ''}
            onChange={(e) => updateNotes(e)}
          ></textarea>
        </>
      )}
    </section>
  );
}

export default PokemonDetails;