import s from './style.module.css';
import PokemonCard from '../../../PokemonCards';
import {useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import { FireBaseContext } from '../../../../context/firebasecontext';
import { PokemonContext } from '../../../../context/pokemoncontext';

const StartPage = () => {
  const [pokemonsArray, setPokemonState] = useState({});
  const firebase = useContext(FireBaseContext);
  const history = useHistory();
  const pokemonsContext = useContext(PokemonContext);

  useEffect(() => {
    firebase.getPokemonSoket((pokemonsArray) => {
      setPokemonState(pokemonsArray)
    })
    return () => firebase.offPokemonSoket;
  },[firebase]);
 
  const setStateOfPokemon = (key) => {
      const pokemon = {...pokemonsArray[key]}
      pokemonsContext.onSelectedPokemons(key, pokemon);
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
  
    return (
      <>
     <div className={s.wrapButton}>
     <button 
     onClick={handleStart}
     disabled={Object.keys(pokemonsContext.pokemon).length < 5} >
      START GAME</button>
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
            if (Object.keys(pokemonsContext.pokemon).length < 5 || selected) {
                setStateOfPokemon(key)
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