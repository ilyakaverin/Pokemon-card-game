import {useRouteMatch, Switch, Route} from 'react-router-dom';
import {useState} from 'react';
import StartPage from './Start';
import BoardPage from './Board';
import FinishPage from './Finish';
import { PokemonContext } from '../../../context/pokemoncontext';

const GamePage = () => {
  const match = useRouteMatch();
  const [selected, setSelected] = useState({});
  

  const handle = (key, pokemon) => {
    setSelected(prevState => {

      if(prevState[key]) {
        const copyState = {...prevState};
        delete copyState[key];
        return copyState
      }

      return {
        ...prevState,
        [key]: pokemon,
      }
    })
  }

  return (
    <PokemonContext.Provider value={{
      pokemon: selected,
      onSelectedPokemons: handle
    }}>

   
      <Switch>
          <Route path={`${match.path}/`} exact component={StartPage} />
          <Route path={`${match.path}/board`} component={BoardPage} />
          <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );
};
export default GamePage;