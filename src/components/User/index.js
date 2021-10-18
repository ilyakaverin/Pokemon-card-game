import {  useDispatch, useSelector } from "react-redux";
import {  removeUser, selectUser } from "../../store/users";
import {setCleanData, setClean} from '../../store/pokemons';
import { getStatsAsync, userStats, isLoadingStats, setStats} from '../../store/stats'
import style from './style.module.css';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";



const UserPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const stats = useSelector(userStats);
    const isLoading = useSelector(isLoadingStats)

    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        dispatch(getStatsAsync())
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if(stats && Object.entries(stats).length > 0) {
            const key = Object.keys(stats);
            setStatistics(stats[key])
        }
    },[stats])
  
    const logOut = () => {
        localStorage.removeItem('idToken');
        dispatch(removeUser());
        dispatch(setCleanData({}));
        dispatch(setClean({}));
        dispatch(setStats({}));
        history.push('/')

    }



    return (
        <div className={style.userInfo}>
        <span>EMAIL</span>
         <span>{user.email}</span> 
         <span>CREATED AT</span>
          <span>{Date(user.createdAt)}</span>
          {
              isLoading ? <div className={style.pokeball}><span></span></div> : <div className={style.stats}>
          <span> Lose {statistics?.lose}</span>
          <span> Wins {statistics?.wins}</span>
          <span> Draw {statistics?.draw}</span>
          

          </div>
          
          }
          
          
         
          <button onClick={logOut}> LOGOUT</button>
           </div>

        
    )
}
export default UserPage