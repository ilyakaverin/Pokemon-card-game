import {useRouteMatch, Switch, Route} from 'react-router-dom';
import {useState} from 'react';
import StartPage from './Start';
import BoardPage from './Board';
import FinishPage from './Finish';
import { PokemonContext } from '../../../context/pokemoncontext';

const GamePage = () => {
  const match = useRouteMatch();
  const [selected, setSelected] = useState({});
  const [player2, setPlayer2] = useState([]);
  const [winner, setWinner] = useState('');
  
  
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
  const clean = () => setSelected(prevState => Object());


  return (
    <PokemonContext.Provider value={{
      pokemon: selected,
      player2: player2,
      onSelectedPokemons: handle,
      setPlayer2: setPlayer2,
      Whowin: winner,
      setWinner: setWinner,
      cleanContext: clean
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