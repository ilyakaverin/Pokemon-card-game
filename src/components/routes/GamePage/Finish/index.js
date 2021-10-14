import {useHistory} from 'react-router-dom';
import { useState} from 'react';
import PokemonCard from '../../../PokemonCards';
import style from './style.module.css';
import cn from 'classnames';
import { SelectedPokemon, setWin, setClean, getPokemonsAsync } from '../../../../store/pokemons';
import { pokemons2Data, setPlayerToRedux } from '../../../../store/pokemons2';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../../../store/users';



const FinishPage = () => {
    const history = useHistory();
    
    const [winCard, setWinCard] = useState({});
    const winner = useSelector(setWin);
    const dispatch = useDispatch()
    const player2 = useSelector(pokemons2Data);
    const player1 = useSelector(SelectedPokemon);
    const user = useSelector(selectUser)

    const addWinPokemon =  async () => {

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(winCard),
        }
         await fetch(`https://pokemon-game-ca189-default-rtdb.asia-southeast1.firebasedatabase.app/${user.localId}/pokemons.json`,requestOptions);
    }

    const handle= () => {
        if(winner === 'win') {
            addWinPokemon();
        }
        history.push('/game');
        dispatch(getPokemonsAsync());
        dispatch(setClean({}))
        dispatch(setPlayerToRedux({}))
        
    }
    const pick = (id) => {
        // eslint-disable-next-line array-callback-return
        Object.values(player2).map((item) => {
            if(item.id === id) {
                setWinCard(item)
            }
        })
     
  }
    if(Object.values(player1).length === 0) {
        history.replace('/')
      }
      
    return (
        <>
        <div className ={style.flex}>
         {
            Object.values(player1).map((card) =>  (  
                
                <PokemonCard
                className={style.card}
                key={card.key}
               objectId={card.key}
               name={card.name}
               type={card.type}
               img={card.img}
               values={card.values}
               id={card.id}                     
               active
               
               /> 
               
               ))
                            }
</div>
        
        <button className={style.wrapButton} onClick={handle} disabled={Object.keys(winCard).length === 0 && winner === 'player1'}>END GAME</button>
       
        <div className ={style.flex}>

        {
            Object.values(player2).map((card) =>  (  
                <PokemonCard
                className={cn(style.card, {[style.pick] : winCard.id === card.id  })}
                key={card.key}
               objectId={card.key}
               name={card.name}
               type={card.type}
               img={card.img}
               values={card.values}
               id={card.id}                     
               active
               StateOfPokemon={() => pick(card.id)}
               /> 
               ))
                            }

        </div>
        </>
    )
}
export default FinishPage;