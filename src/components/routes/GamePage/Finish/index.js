import {useHistory} from 'react-router-dom';
import { useState, useEffect} from 'react';
import PokemonCard from '../../../PokemonCards';
import style from './style.module.css';
import cn from 'classnames';
import { SelectedPokemon, setWin, setClean, getPokemonsAsync } from '../../../../store/pokemons';
import { pokemons2Data, setPlayerToRedux } from '../../../../store/pokemons2';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../../../store/users';
import { userStats, getStatsAsync } from '../../../../store/stats';
import { updateStats, addWinPokemon } from '../Board/utils';



const FinishPage = () => {

    const history = useHistory();
    const [winCard, setWinCard] = useState({});
    const winner = useSelector(setWin);
    const stats = useSelector(userStats)
    const dispatch = useDispatch()
    const player2 = useSelector(pokemons2Data);
    const player1 = useSelector(SelectedPokemon);
    const user = useSelector(selectUser);
    const key = Object.keys(stats).join('');
    const value = stats[key];
    const [statistic, setStatistic] = useState(value);

    if(Object.values(player1).length === 0) {
        history.replace('/')
      }

    useEffect(() => { 
        setStatistic(prevState => {
            const copy = {...prevState};
            copy[winner] = copy[winner] + 1
            return copy
        })
        // eslint-disable-next-line
    },[])
    
    const handle= () => {
        if(winner === 'wins') {
            addWinPokemon(winCard, user);
        }
        updateStats(statistic, user, key)
        dispatch(getPokemonsAsync());
        history.push('/game');
        dispatch(getStatsAsync());
        dispatch(setClean({}));
        dispatch(setPlayerToRedux({}));
        
    }
    const pick = (id) => {
        // eslint-disable-next-line array-callback-return
        Object.values(player2).map((item) => {
            if(item.id === id) {
                setWinCard(item);
            }
        })
     
  }
  
    
      
    return (
        <>
         
        <div className ={style.flex}>
         {
            Object.values(player1).map((card, index) =>  (  
                
                <PokemonCard
                className={style.card}
                key={index}
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
        <div className={style.info}>
            <button 
            className={style.startButton} 
            onClick={handle} disabled={Object.keys(winCard).length === 0 && winner === 'wins'}>END GAME</button>
            <span> Winner is {winner === 'wins' ?  'player1' : winner === 'lose' ? 'player 2' : 'draw'}</span>
            {winner === 'wins' ? <span>Choose enemy pokemon, you can add him to you library</span> : <></>}
        </div>
        

        <div className ={style.flex}>
                          
            {
                Object.values(player2).map((card, index) =>  (  
                    <PokemonCard
                        className={cn(style.card, {[style.pick] : winCard.id === card.id  })}
                        key={index}
                        objectId={card.key}
                        name={card.name}
                        type={card.type}
                        img={card.img}
                        values={card.values}
                        id={card.id}                     
                        active
                        StateOfPokemon={() => pick(card.id)}
                    /> ))
            }
        </div>
        
        </>
    )
}
export default FinishPage;