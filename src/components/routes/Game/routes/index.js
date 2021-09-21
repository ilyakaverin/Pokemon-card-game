import {useRouteMatch, Switch, Route} from 'react-router-dom';
import {useState} from 'react'
import StartPage from './Start';
import BoardPage from './Board';
import FinishPage from './Finish';
import {PokemonContext} from '../../../../context/pokemoncontext';

const GamePage = () => {
    const match = useRouteMatch();

    const handleSelectedPokemons = () => {
        console.log("###: handleSelectedPokemons")
    }
    const [pokemons, setPokemons] = useState({});

    return (
        <PokemonContext.Provider value={{
            pokemons: [],
            onSelectedPokemons: handleSelectedPokemons

        }}>
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
        </PokemonContext.Provider>
    );
};
export default GamePage