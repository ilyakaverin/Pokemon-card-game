import Header from './components/Header/index';
import Layout from './components/Layout/index';
import Footer from './components/Footer/index';
import bg from '../src/assets/bg3.jpeg'



const App = () => {
  return (
      <>
      <Header title='This is title' descr='This is Description!' />
      <Layout title='this is layout title' descr='this is description' urlBg = {bg} />
      <Layout title='this is layout title' descr='this is description' colorBg = 'red'  />
      <Layout title='this is layout title' descr='this is description' urlBg = {bg} />
      <Footer 
      title = 'THANKS FOR VISITING'
      descr = '© 2021 #ReactMarathon.' />
      </>

    )
  
}

export default App;
