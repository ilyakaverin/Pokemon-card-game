import { useState } from 'react';
import style from './style.module.css';
import CardBackSide from './assets/card-back-side.jpeg';


const PokemonCard = ({name, type, img, values, id }) => {
    const [isActive, setActive] = useState(false);
    const handle = () => console.log(setActive(true));

    return (
<div className={style.root} onClick={handle}>
      <div className={`${style.pokemonCard} ${ isActive ? style.active : ''}`}>
        <div className={style.cardFront}>
            <div className={`${style.wrap} ${style.front}`}>
                <div className={`${style.pokemon} ${style[type]}`}>
                    <div className={style.values}>
                        <div className={[style.count, style.top].join(' ')}>{values.top}</div>
                        <div className={[style.count, style.right].join(' ')}>{values.right}</div>
                        <div className={[style.count, style.bottom].join(' ')}>{values.bottom}</div>
                        <div className={[style.count, style.left].join(' ')}>{values.left}</div>
                    </div>
                    <div className={style.imgContainer}>
                        <img src={img} alt={name} />
                    </div>
                    <div className={style.info}>
                        <span className={style.number}>#{id}</span>
                        <h3 className={style.name}>{name}</h3>
                        <small className={style.type}>Type: <span>{type}</span></small>
                    </div>
                </div>
            </div>
        </div>

        <div className={style.cardBack}>
            <div className={`${style.wrap} ${style.back}`}>
                <img src={CardBackSide} alt="Сard Backed" />
            </div>
        </div>

    </div>
</div>

    )
}
export default PokemonCard