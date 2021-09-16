import style from './style.module.css';
import {useHistory} from 'react-router-dom'
const Header= ({title, descr, onClickButton }) => {
    const history = useHistory();
    const handle = () => {
        history.push('/game');
    }
    return (
        <header className={style.root}>
        <div className={style.forest}></div>
        <div className={style.silhouette}></div>
        <div className={style.moont}></div>
        
        <div className={style.container}>
             <h1>{title}</h1>
             <p>{descr}</p>
             <button className={style.startButton} onClick={handle}>
                 Start Game
             </button>
        </div>
    </header>
    )
}
export default Header;