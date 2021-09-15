import {useState} from 'react';
import HomePage from './components/routes/home/index';
import GamePage from './components/routes/game/index';
import './App.css'


const App = () => {
const [page, setPage] = useState('app');
const handleChangePage = (page) => {
  console.log("####: <App />");
  setPage(page)
}

  switch(page) {
    case 'app':
      return <HomePage onChangePage={handleChangePage} />
    case 'game':
      return <GamePage onChangePage={handleChangePage} />
      default: 
      return <HomePage onChangePage={handleChangePage} />
  }
}
export default App