import Header from './components/Header/index';
import Layout from './components/Layout/index';
import Footer from './components/Footer/index';
import bg from '../src/assets/bg3.jpeg'



const App = () => {
  return (
      <>
      <Header title='This is title' descr='This is Description!' />
      <Layout urlBg = {bg} />
      <Layout colorBg = 'red'  />
      <Layout urlBg = {bg} />
      <Footer 
      title = 'THANKS FOR VISITING'
      descr = '© 2021 #ReactMarathon.' />
      </>

    )
  
}

export default App;
