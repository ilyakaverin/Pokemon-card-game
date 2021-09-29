import {createSlice} from '@reduxjs/toolkit';
import FirebaseClass from '../service/firebase';

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
        })
    }
})

export const {fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject, setStateOfPokemon, setPlayer2, setWinner, setClean } = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;

export const selectPokemonsData = state => state.pokemons.data;
export const SelectedPokemon = state => state.pokemons.player1Board;
export const setWin = state => state.pokemons.winner;
export const getPokemonsAsync = () => async (dispatch )=> {

    dispatch(fetchPokemons());
    const data = await FirebaseClass.getPokemonOnce();
    dispatch(fetchPokemonsResolve(data))

}

export default slice.reducer;