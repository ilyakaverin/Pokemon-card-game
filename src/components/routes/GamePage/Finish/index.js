import {useHistory} from 'react-router-dom';
import {useContext, useState} from 'react';
import {PokemonContext}  from '../../../../context/pokemoncontext';
import PokemonCard from '../../../PokemonCards';
import style from './style.module.css';
import { FireBaseContext } from '../../../../context/firebasecontext';
import cn from 'classnames';


const FinishPage = () => {
    const history = useHistory();
    const {pokemon, player2, Whowin, cleanContext} = useContext(PokemonContext);
    const [winCard, setWinCard] = useState({});
    const firebase = useContext(FireBaseContext);

    const handle= () => {
        if(Whowin === 'player1') {
            firebase.addPokemon(winCard);
        }
        history.push('/game');
        cleanContext()
        
    }
    const pick = (id) => {
        player2.map((item) => {
            if(item.id === id) {
                setWinCard(item)
            }
        })
     
  }
    if(Object.keys(pokemon).length === 0) {
        history.replace('/')
      }
      
    return (
        <>
        <div className ={style.flex}>
         {
            Object.values(pokemon).map((card) =>  (  
                
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
        
        <button className={style.wrapButton} onClick={handle} disabled={Object.keys(winCard).length === 0 && Whowin === 'player1'}>END GAME</button>
       
        <div className ={style.flex}>

        {
            player2.map((card) =>  (  
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