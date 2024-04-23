import './../assets/styles/pokedex-stats.css';
import Button from './../components/Button';

interface PokedexStatsProps {
  totalPokemons: number;
  savedPokemons: any[];
  showStatsMobile: boolean;
  resetPokedex: () => void;
}

function PokedexStats({totalPokemons, savedPokemons, showStatsMobile, resetPokedex}: PokedexStatsProps) {

  const catchedPokemons = savedPokemons.filter(pokemon => pokemon.added_at !== null).length;

  return (
    <section className={`stats-panel ${showStatsMobile ? 'stats-panel--active' : ''}`}>
      <div>
        <h1 className='pokedex-title'>Pokédex</h1>
        <div className='stats-entry'>
          <p className='stats-entry__title'>Catched pokémons</p>
          <p className='stats-entry__value'>{catchedPokemons}/{totalPokemons}</p>
        </div>
        <div className='stats-entry'>
          <p className='stats-entry__title'>Pokedéx completion</p>
          <p className='stats-entry__value'>{Math.round((catchedPokemons / totalPokemons) * 100)}%</p>
        </div>
      </div>
      <div>
        <Button onClick={() => resetPokedex()} customClasses='mb-8'>Reset pokédex</Button>
        <p className='m-0 ts-4 fw-700 color-light'>
          created by: <a className='color-light' href='https://joaomarques.website/'>joaomarques.website</a>
        </p>
      </div>
    </section>
  );
}

export default PokedexStats;