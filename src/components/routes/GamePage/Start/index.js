import s from './style.module.css';
import PokemonCard from '../../../PokemonCards';
import {useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectPokemonsData, getPokemonsAsync, setStateOfPokemon, SelectedPokemon, setWinner, selectPokemonsLoading } from '../../../../store/pokemons';
import { getStatsAsync } from '../../../../store/stats';
const StartPage = () => {
  const [pokemonsArray, setPokemonState] = useState({});
  const history = useHistory();
  const selectedRedux = useSelector(SelectedPokemon);
  const pokemonsRedux = useSelector(selectPokemonsData);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectPokemonsLoading)
  


  useEffect(() => {
    dispatch(getPokemonsAsync());
    dispatch(getStatsAsync())
    dispatch(setWinner(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    setPokemonState(pokemonsRedux);
  }, [pokemonsRedux])
 
  const handleClick = (key) => {
      const pokemon = {...pokemonsArray[key]};
      dispatch(setStateOfPokemon({key, pokemon}));
      setPokemonState(prevState => ({
        ...prevState,
        [key]: {
            ...prevState[key],
            selected: !prevState[key].selected,
        }
    }))
    
  }

  const handleStart = () => {
history.push('/game/board')
  }
  if(isLoading) {
    return <div className={s.pokeball}><span></span></div>
  }
  
    return (
      <>
     <div className={s.wrapButton}>
     <button 
     className={s.startButton}
     onClick={handleStart}
     disabled={Object.keys(selectedRedux).length < 5} > START GAME</button>
     <p>Choose 5 pokemons and click button</p>
    </div>
      
      <div className={s.flex}>
      
      {
        Object.entries(pokemonsArray)
        .map(([key, {name, img, id, type,values, selected}]) => <PokemonCard
           className={s.card}
           objectId={key}
           key={key}
           name={name}
           type={type}
           img={img}
           values={values}
           id={id}
           active={true}
           StateOfPokemon={ () => {
            if (Object.keys(selectedRedux).length < 5 || selected) {
                handleClick(key)
               }
           }
               
           }
           isSelected={selected} 
           /> )
         
        }
      </div>
      </>
    )
}
export default StartPage;