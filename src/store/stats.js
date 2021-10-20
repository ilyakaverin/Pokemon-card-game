import {createSlice} from '@reduxjs/toolkit';
import { selectLocalId } from './users';

export const slice3 = createSlice({
    name: 'statistics',
    initialState: {
        isLoading: false,
        data: {},
        cardsIWon: {}
    },
    reducers: {
        fetchStats: () => ({
            isLoading: true
        }),
        setStats: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload
        }),
        setCardsIWon: (state, action) => ({
            ...state,
            isLoading: false,
            cardsIWon: action.payload
        })

    }
})

export const { setStats, fetchStats,setCardsIWon } = slice3.actions;

export const userStats = state => state.statistics.data;
export const isLoadingStats = state => state.statistics.isLoading;
export const wonCards = state => state.statistics.cardsIWon;

export const getStatsAsync = () => async (dispatch, getState) => {
    dispatch(fetchStats());
    const localId = selectLocalId(getState());
    const data = await fetch(`https://pokemon-game-ca189-default-rtdb.asia-southeast1.firebasedatabase.app/${localId}/stats.json?auth=${localStorage.getItem('idToken')}`).then(res => res.json());
    const poke = await fetch(`https://pokemon-game-ca189-default-rtdb.asia-southeast1.firebasedatabase.app/${localId}/pokemons.json?auth=${localStorage.getItem('idToken')}`).then(res => res.json());
    
    const wonCards = Object.keys(poke)
    .slice(5)
    .reduce((result, key) => {
        result[key] = poke[key];
        return result;
    }, {});
    
    dispatch((setStats(data)));
    dispatch(setCardsIWon(wonCards));
    
}



export default slice3.reducer;