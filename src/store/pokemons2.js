import {createSlice} from '@reduxjs/toolkit';

export const slice2 = createSlice({
    name: 'pokemons2',
    initialState: {
        data: {},
    },
    reducers: {
        setPlayerToRedux: (state, action) => ({
            ...state,
            data: action.payload
        })

    }
})

export const { setPlayerToRedux } = slice2.actions;

export const pokemons2Data = state => state.pokemons2.data;



export default slice2.reducer;