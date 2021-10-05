import {configureStore} from '@reduxjs/toolkit';
import pokemonsReducer from './pokemons';
import pokemons2Reducer from './pokemons2';
import userReducer from './users';


export default configureStore({
    reducer: {
        user: userReducer,
        pokemons: pokemonsReducer,
        pokemons2: pokemons2Reducer,
    }
})
