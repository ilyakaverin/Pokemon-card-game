import PokemonCard from '../../../../../PokemonCards';
import {useState} from 'react';
import style from './style.module.css';
import cn from 'classnames';
import { nanoid } from 'nanoid';


const PlayerBoard = ({ player, cards, onClickCard}) => {

    const [isSelected, setSelected] = useState(null);

    return (
        
        <>
        {
            
            cards.map((card) =>  (  
                <div className={cn(style.cardBoard, {[style.selected] : isSelected === card.id})}
                     onClick={() => { 
                    setSelected(card.id);
                    onClickCard && onClickCard({
                    player,
                    ...card,
                   
                            })
                            }
                
                }
                >             
                <PokemonCard
                key={nanoid()}
               name={card.name}
               type={card.type}
               img={card.img}
               values={card.values}
               id={card.id}
               active={card.active}
               minimize                      
               /> 
               </div>
               ))
                            }
                            </>
    )
}
export default PlayerBoard;