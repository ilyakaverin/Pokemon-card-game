import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import MenuHeader from './components/MenuHeader';
import HomePage from './components/routes/HomePage/index';
import GamePage from './components/routes/GamePage/index';
import NotFound from './components/routes/NotFound/index';
import AboutPage from './components/routes/AboutPage/index';
import ContactPage from './components/routes/ContactPage';
import Footer from './components/Footer/index';
import PrivateRoute from './components/PrivateRoute';
import {NotificationContainer} from 'react-notifications';
import  style from './App.module.css';
import cn from 'classnames';

import 'react-notifications/lib/notifications.css';

const App = () => {
  const location = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board'
return (
  <Switch>
  <Route path='/404' component={NotFound} />
    <>
    <MenuHeader bgActive={!isPadding} />
    <NotificationContainer />
    <div className ={cn(style.wrap, {
      [style.isHomePage] : isPadding
    })}>
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/home' component={HomePage} />
      <PrivateRoute path='/game' component={GamePage} />
      <PrivateRoute path='/about'  component={AboutPage} />
      <PrivateRoute path='/contact' component={ContactPage} />
      <Route render={() => (
        <Redirect to={'/404'} />
      )} />
      
    </Switch>
</div>
        <Footer title={'THANK FOR VISITING'} descr={'2021'} /> 

    </>
    
  </Switch>
  
    
)
}
export default App