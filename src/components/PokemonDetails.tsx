import { useState, useEffect } from 'react';
import './../assets/styles/pokemon-details.css';
import debounce from './../utils/debounce';
import pokeballBg from './../assets/images/pokeball-bg.svg';
import Button from './../components/Button';

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
  } | undefined;
  showDetailsMobile: boolean;
  updatePokemonNotes: (id: number, timestamp: number | null, notes: string) => void;
  closeDetailsMobile: () => void;
}

function PokemonDetails({pokemon, showDetailsMobile, updatePokemonNotes, closeDetailsMobile}: PokemonDetailsProps) {
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
    <section className={`details-panel ${curPokemon ? 'details-panel--active' : ''} ${showDetailsMobile ? 'details-panel--active-mobile' : ''}`}>
      {curPokemon ? (
        <>
          <div className='mb-16'>
            <Button size='sm' onClick={() => closeDetailsMobile()}>X Close</Button>
          </div>
          <div className='details-header'>
            <img src={curPokemon.image} alt={curPokemon.name} className='details-header__img' />
            <div className='details-header__info'>
              <p className='m-0 mb-8'>
                <span className='ts-4 fw-700'>No.{curPokemon.id}</span>&nbsp;
                <span className='ts-3 text-uppercase'>{curPokemon.name}</span>
              </p>
              <div className='flex mb-8'>
                <p className='m-0 ts-4 mr-8'>
                  <span className='fw-700'>{curPokemon.height}</span>&nbsp;
                  <span>Height</span>
                </p>
                <p className='m-0 ts-4'>
                  <span className='fw-700'>{curPokemon.weight}</span>&nbsp;
                  <span>Weight</span>
                </p>
              </div>
              <div className='flex align-center'>
                <span className='m-0 ts-4'>Types:</span>&nbsp;
                {curPokemon.types.map((type, index) => (
                  <span key={index} className='tag'>{type.type.name}</span>
                ))}
              </div>
            </div>
          </div>
          <div className='details-stats'>
            <p className='m-0 mb-8 text-uppercase ts-4 fw-700'>Pokémon Stats</p>
            <div className='details-stats__grid'>
              {curPokemon.stats.map((stat, index) => (
                <p className='m-0 mb-8 ts-4' key={index}>
                  <span className='ts-3 fw-800'>{stat.base_stat}</span>&nbsp;&nbsp;{stat.stat.name}
                </p>
              ))}
            </div>
          </div>
          <div className='details-notes'>
            <p className='m-0 mb-8 text-uppercase ts-4 fw-700'>Notes</p>
            <textarea
              className='details-notes__textarea'
              placeholder='Type some notes about this Pokémon'
              key={curPokemon ? curPokemon.id : 'default'}
              defaultValue={curPokemon.notes || ''}
              onChange={(e) => updateNotes(e)}
            ></textarea>
          </div>
        </>
      ) : (
        <div className='details-placeholder'>
          <img className='details-placeholder__img' src={pokeballBg} alt="Pokédex"/>
          <p className='ts-3 fw-700 text-uppercase'>Pokedex details panel</p>
        </div>
      )}
    </section>
  );
}

export default PokemonDetails;