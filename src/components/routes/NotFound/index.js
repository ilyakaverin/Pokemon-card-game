import style from './style.module.css';
import {useHistory} from 'react-router-dom';
import img from '../../../assets/snorlax404.svg';
const NotFound = () => {
    const history = useHistory();
    const handle = () => {
        history.push('/')
    }
    return (
        <div className={style.center}>
        <img className={style.snorlax} src={img} alt='snorlax' />
        <h1>This page not found</h1>
        <button onClick={handle}
        >
            MAIN PAGE
        </button>
        </div>
    )
}

export default NotFound