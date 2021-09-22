import s from './style.module.css';
import { useContext } from 'react';
import { PokemonContext } from '../../../../context/pokemoncontext';
import PokemonCard from '../../../PokemonCards';

const BoardPage = () => {
    const pokemonContext = useContext(PokemonContext);
    
    return (
        <div className={s.root}>
						<div className={s.playerOne}>
                        {
                            Object.values(pokemonContext.pokemon).map(({key, name, type, img, values, id, selected}) =>  ( 
            <PokemonCard
           className={s.card}
           objectId={key}
           key={key}
           name={name}
           type={type}
           img={img}
           values={values}
           id={id}
           minimize                      
           active
           isSelected={selected} 
           /> ))
                        }
        
						</div>
            <div className={s.board}>
                <div className={s.boardPlate}>1</div>
                <div className={s.boardPlate}>2</div>
                <div className={s.boardPlate}>3</div>
                <div className={s.boardPlate}>4</div>
                <div className={s.boardPlate}>5</div>
                <div className={s.boardPlate}>6</div>
                <div className={s.boardPlate}>7</div>
                <div className={s.boardPlate}>8</div>
                <div className={s.boardPlate}>9</div>
            </div>
        </div>
    );
};

export default BoardPage;