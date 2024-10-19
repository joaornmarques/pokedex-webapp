import { useSelector, useDispatch } from 'react-redux';
import localforage from 'localforage';
import './../assets/styles/pokemon-details.css';
import debounce from './../utils/debounce';
import pokeballBg from './../assets/images/pokeball-bg.svg';
import Button from './../components/Button';
import { store, RootState, AppDispatch } from './../redux/store';
import { setDetailsPanel, setActivePokemon } from './../redux/uiSlice';
import { updatePokemonNotes } from './../redux/savedPokemonsSlice';

function PokemonDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const { activePokemon, detailsPanel } = useSelector((state: RootState) => state.ui);

  const debouncedUpdateNotes = debounce((id: number, notes: string) => {
    dispatch(updatePokemonNotes({ id, notes }));
    const updatedSavedPokemons = store.getState().savedPokemons;
    localforage.setItem('savedPokemons', updatedSavedPokemons);
  }, 1000);

  const updateNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = (e.target as HTMLTextAreaElement).value;
    if (activePokemon) {
      debouncedUpdateNotes(activePokemon.id, newNotes);
    }
  }

  const closeDetailsMobile = () => {
    dispatch(setDetailsPanel(false));
    dispatch(setActivePokemon(undefined));
  }

  return (
    <section className={`details-panel ${activePokemon ? 'details-panel--active' : ''} ${detailsPanel ? 'details-panel--active-mobile' : ''}`}>
      {activePokemon ? (
        <>
          <div className='mb-16'>
            <Button size='sm' onClick={() => closeDetailsMobile()}>X Close</Button>
          </div>
          <div className='details-header'>
            <img src={activePokemon.image} alt={activePokemon.name} className='details-header__img' />
            <div className='details-header__info'>
              <p className='m-0 mb-8'>
                <span className='ts-4 fw-700'>No.{activePokemon.id}</span>&nbsp;
                <span className='ts-3 text-uppercase'>{activePokemon.name}</span>
              </p>
              <div className='flex mb-8'>
                <p className='m-0 ts-4 mr-8'>
                  <span className='fw-700'>{activePokemon.height}</span>&nbsp;
                  <span>Height</span>
                </p>
                <p className='m-0 ts-4'>
                  <span className='fw-700'>{activePokemon.weight}</span>&nbsp;
                  <span>Weight</span>
                </p>
              </div>
              <div className='flex align-center'>
                <span className='m-0 ts-4'>Types:</span>&nbsp;
                {activePokemon.types.map((type, index) => (
                  <span key={index} className='tag'>{type.type.name}</span>
                ))}
              </div>
            </div>
          </div>
          <div className='details-stats'>
            <p className='m-0 mb-8 text-uppercase ts-4 fw-700'>Pokémon Stats</p>
            <div className='details-stats__grid'>
              {activePokemon.stats.map((stat, index) => (
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
              key={activePokemon ? activePokemon.id : 'default'}
              defaultValue={activePokemon.notes || ''}
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