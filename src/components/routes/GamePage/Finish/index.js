import {useHistory} from 'react-router-dom';
import {useContext, useState} from 'react';
import {PokemonContext}  from '../../../../context/pokemoncontext';
import PokemonCard from '../../../PokemonCards';
import style from './style.module.css';
import { FireBaseContext } from '../../../../context/firebasecontext';


const FinishPage = () => {
    const history = useHistory();
    const {pokemon, player2, Whowin} = useContext(PokemonContext);
    const [winCard, setWinCard] = useState({});
    const firebase = useContext(FireBaseContext);

    const handle= () => {
        if(Whowin === 'player1') {
            firebase.addPokemon(winCard);
        }
        history.push('/game');
        window.location.reload();
        
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
        
        <button className={style.wrapButton} onClick={handle}>END GAME</button>
       
        <div className ={style.flex}>

        {
            player2.map((card) =>  (  
                <div onClick={ () => {
                    player2.map((item) => {
                        if(item.id === card.id) {
                            setWinCard(item)
                        }
                    })
                }}>
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
               </div>
               ))
                            }

        </div>
        </>
    )
}
export default FinishPage;