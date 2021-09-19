import style from './style.module.css';
import PokemonCard from '../../PokemonCards/index';
import database from '../../../service/firebase'
import {useState, useEffect } from 'react';

const GamePage = () => {
  const [pokemonsArray, setPokemonState] = useState({});

  useEffect(() => {
    database.ref('pokemons').once('value', (snapshot) => {
      setPokemonState(snapshot.val())
    })
  })
 
  const setStateOfPokemon = (key) => {
    setPokemonState(prevState => {
      return Object.entries(prevState).reduce((acc, item) => {
          const pokemon = {...item[1]};
          if (item[0] === key) {
              pokemon.active = !pokemon.active;
          };
          database
          .ref('pokemons/'+ item[0])
          .set({...pokemon});
  
          acc[item[0]] = pokemon;
  
          return acc;
      }, {});
  });
  }
  const addCard = () => {
    const arr = Object.entries(pokemonsArray);
    const [, properties] = arr[Math.floor(Math.random() * arr.length)];
    const newKey = database.ref().child('pokemons').push().key;
    database.ref('pokemons/' + newKey).set({...properties});
    
  }

  
  
    return (
      <div className={style.flex}>
      <button onClick={addCard}> ADD NEW CARD</button>
      <div className={style.flex}>
      
      {
        Object.entries(pokemonsArray)
        .map(([key, {name, img, id, type,values, active}]) => <PokemonCard
           objectId={key}
           key={key}
           name={name}
           type={type}
           img={img}
           values={values}
           id={id}
           active={active}
           StateOfPokemon={setStateOfPokemon} 
           /> )
         
        }
      </div>
      </div>
    )
}
export default GamePage;