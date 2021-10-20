import {  useDispatch, useSelector } from "react-redux";
import {  removeUser, selectUser } from "../../store/users";
import {setCleanData, setClean} from '../../store/pokemons';
import { getStatsAsync, userStats, isLoadingStats, setStats, wonCards} from '../../store/stats'
import style from './style.module.css';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import PokemonCard from '../PokemonCards';




const UserPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const stats = useSelector(userStats);
    const iwinCards = useSelector(wonCards)
    const isLoading = useSelector(isLoadingStats)

    const [statistics, setStatistics] = useState(null);
    const [cardsIWon, setCardsIWon] = useState({});

    useEffect(() => {
        dispatch(getStatsAsync())
        // eslint-disable-next-line
    },[])
    useEffect(() => {
        if(stats && Object.entries(stats).length > 0) {
            const key = Object.keys(stats);
            setStatistics(stats[key])
        }
        if(iwinCards) {
            setCardsIWon(iwinCards)
        }
    },[stats, iwinCards]);
  
    const logOut = () => {
        localStorage.removeItem('idToken');
        dispatch(removeUser());
        dispatch(setCleanData({}));
        dispatch(setClean({}));
        dispatch(setStats({}));
        history.push('/')

    }



    return (
        <>
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

          <span className={style.span}>Cards I Won</span>
           </div>
           {
       isLoading ? <div className={style.userInfo}><div className={style.pokeball}><span></span></div></div> : <div className={style.flex}> {Object.entries(cardsIWon)
        .map(([key, {name, img, id, type,values}]) => 
            <PokemonCard
           className={style.card}
           objectId={key}
           key={key}
           name={name}
           type={type}
           img={img}
           values={values}
           id={id}
           /> 
           )}
           </div>
        }
           
     
        
        </>

        
    )
}
export default UserPage