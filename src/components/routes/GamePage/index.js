import {useRouteMatch, Switch, Route} from 'react-router-dom';
import StartPage from './Start';
import BoardPage from './Board';
import FinishPage from './Finish';
import PrivateRoute from '../../PrivateRoute';

const GamePage = () => {
  const match = useRouteMatch();

  return (
      <Switch>
          <Route path={`${match.path}/`} exact component={StartPage} />
          <PrivateRoute path={`${match.path}/board`} component={BoardPage} />
          <PrivateRoute path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    
  );
};
export default GamePage;