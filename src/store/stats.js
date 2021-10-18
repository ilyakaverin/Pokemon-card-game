import {createSlice} from '@reduxjs/toolkit';
import { selectLocalId } from './users';

export const slice3 = createSlice({
    name: 'statistics',
    initialState: {
        isLoading: false,
        data: {},
    },
    reducers: {
        fetchStats: () => ({
            isLoading: true
        }),
        setStats: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload
        })

    }
})

export const { setStats, fetchStats } = slice3.actions;

export const userStats = state => state.statistics.data;
export const isLoadingStats = state => state.statistics.isLoading;

export const getStatsAsync = () => async (dispatch, getState) => {
    dispatch(fetchStats());
    const localId = selectLocalId(getState());
    const data = await fetch(`https://pokemon-game-ca189-default-rtdb.asia-southeast1.firebasedatabase.app/${localId}/stats.json?auth=${localStorage.getItem('idToken')}`).then(res => res.json());
    dispatch((setStats(data)));
    
}



export default slice3.reducer;