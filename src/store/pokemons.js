import {createSlice} from '@reduxjs/toolkit';
import { selectLocalId } from './users';

export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        player1Board: {},
        winner: null,
        error: null,
    },
    reducers: {
        fetchPokemons: state => ({
            ...state,
            isLoading: true

        }),
        fetchPokemonsResolve: (state, action) => ({
            ...state,
            isLoading:false,
            data: action.payload
        }),
        fetchPokemonsReject: (state, action) => ({
            ...state,
            isLoading:false,
            data: {},
            error: action.payload
        }),
        setStateOfPokemon: (state, {payload: {key, pokemon }}) => {
            if(state.player1Board[key]) {
                const copyState = {...state.player1Board};
                delete copyState[key];
                return {
                    ...state,
                    player1Board: copyState
                }
            }
            return {
                ...state,
                player1Board: {
                    ...state.player1Board,
                    [key]: {
                        ...pokemon
                    }
                }
            }
        },
        setWinner: (state, action) => ({
            ...state,
            winner: action.payload
        }),
        setClean: (state, action) => ({
            ...state,
            player1Board: action.payload
        }),
        setCleanData: (state, action) => ({
            ...state,
            data: action.payload
        }),
    }
})

export const {fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject, setStateOfPokemon, setPlayer2, setWinner, setClean, setCleanData } = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;

export const selectPokemonsData = state => state.pokemons.data;
export const SelectedPokemon = state => state.pokemons.player1Board;
export const setWin = state => state.pokemons.winner;
export const getPokemonsAsync = () => async (dispatch, getState )=> {
    const localId = selectLocalId(getState());
    const idToken = localStorage.getItem('idToken');
    dispatch(fetchPokemons());
    const data = await fetch(`https://pokemon-game-ca189-default-rtdb.asia-southeast1.firebasedatabase.app/${localId}/pokemons.json?auth=${idToken}`).then(res => res.json());
    dispatch(fetchPokemonsResolve(data));

}

export default slice.reducer;