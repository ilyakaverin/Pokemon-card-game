import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './counter';
import pokemonsReducer from './pokemons';

export default configureStore({
    reducer: {
        counter: counterReducer,
        pokemons: pokemonsReducer,
    }
})
