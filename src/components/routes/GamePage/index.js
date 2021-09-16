import style from './style.module.css';
import PokemonCard from '../../PokemonCards/index';
import POKEMONS from '../../PokemonCards/data';
import {useState} from 'react';

const GamePage = () => {
  const [pokemonsArray, setPokemonState] = useState([...POKEMONS]);
 
  const setStateOfPokemon = (id) => {
    setPokemonState((PrevState) => PrevState
    .map((item) => item.id === id ? {...item, active: !item.active} : item))
  }
  
    return (
      <div className={style.flex}>
      {
        pokemonsArray.map(item => <PokemonCard
           key={item.id}
           name={item.name}
           type={item.type}
           img={item.img}
           values={item.values}
           id={item.id}
           active={item.active}
           StateOfPokemon={setStateOfPokemon} 
           /> )
         
        }
      </div>
    )
}
export default GamePage;