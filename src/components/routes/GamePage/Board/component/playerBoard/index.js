import PokemonCard from '../../../../../PokemonCards';
import {useState} from 'react';
import style from './style.module.css';
import cn from 'classnames';

const PlayerBoard = ({ player, cards, onClickCard }) => {

    const [isSelected, setSelected] = useState(null);

    return (
        <>
        {
            cards.map((card) =>  (  
                <div className={cn(style.cardBoard, 
                {[style.selected] : isSelected === card.id}
                )}
                onClick={() => { 
                    setSelected(card.id);
                    onClickCard && onClickCard({
                    player,
                    ...card,
                   
                })
                }}
                >             
                <PokemonCard
                key={card.key}
               objectId={card.key}
               name={card.name}
               type={card.type}
               img={card.img}
               values={card.values}
               id={card.id}
               minimize                      
               active
               isSelected={card.selected} 
               /> 
               </div>
               ))
                            }
                            </>
    )
}
export default PlayerBoard;