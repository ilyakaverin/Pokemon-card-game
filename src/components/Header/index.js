import style from './style.module.css';
import Logo from './component/Logo/index';
import Gif from '../../assets/headerGif.gif'

const Header= ({descr, onClickButton }) => {

    const handle = () => {
        onClickButton && onClickButton()
    }
    
    return (
        <header className={style.root}>
        
        <div className={style.container}>
             <Logo />
             <p>{descr}</p>
             <button className={style.startButton} onClick={handle}>
                 Start Game
             </button>
        </div>
    </header>
    )
}
export default Header;