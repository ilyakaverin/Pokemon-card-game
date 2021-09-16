import {useRouteMatch, Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './components/routes/HomePage/index';
import GamePage from './components/routes/GamePage/index';
import NotFound from './components/routes/NotFound/index';
import AboutPage from './components/routes/AboutPage/index';
import Footer from './components/Footer/index'
import  style from './App.module.css';
import MenuHeader from './components/MenuHeader';
import cn from 'classnames';
import ContactPage from './components/routes/ContactPage';

const App = () => {
  const match = useRouteMatch('/');
return (
  <Switch>
  <Route path='/404' component={NotFound} />
    <>
    <MenuHeader bgActive={!match.isExact} />
    <div className ={cn(style.wrap, {
      [style.isHomePage] : match.isExact
    })}>
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/home' component={HomePage} />
      <Route path='/game' component={GamePage} />
      <Route path='/about'  component={AboutPage} />
      <Route path='/contact' component={ContactPage} />
      <Route render={() => (
        <Redirect to={'/404'} />
      )} />
      
    </Switch>
</div>
        <Footer /> 

    </>
  </Switch>
    
)
}
export default App