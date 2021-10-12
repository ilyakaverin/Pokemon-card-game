import {  useDispatch, useSelector } from "react-redux";
import {  removeUser, selectUser } from "../../store/users";
import {setCleanData, setClean} from '../../store/pokemons'
import style from './style.module.css';
import { useHistory } from "react-router-dom";


const UserPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(selectUser)
   

    const logOut = () => {
        localStorage.removeItem('idToken');
        dispatch(removeUser());
        dispatch(setCleanData({}));
        dispatch(setClean({}))
        history.push('/')

    }

    return (
        <div className={style.userInfo}>
        <span>EMAIL</span>
         <span>{user.email}</span> 
         <span>CREATED AT</span>
          <span>{Date(user.createdAt)}</span>
          <button onClick={logOut}> LOGOUT</button>
           </div>

        
    )
}
export default UserPage