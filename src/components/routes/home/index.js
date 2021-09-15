import Header from '../../Header/index';
import Layout from '../../Layout/index';
import Footer from '../../Footer/index';
import MenuHeader from '../../MenuHeader/index';
import bg from '../../../assets/bg3.jpeg';
import data from '../../PokemonCards/data';
import PokemonCard from '../../PokemonCards/index';
import style from './style.module.css'

const POKEMONS = data;

const HomePage = ({onChangePage}) => {
    const handleClickButton = (page) => {
        onChangePage && onChangePage(page)
    }

  return (
      <>
      <MenuHeader />
      <Header 
      title='Pokemons' 
      descr='Another card game'
      onClickButton={handleClickButton}
       />
      <Layout title='Rules'  urlBg = {bg}>
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>
      </Layout>
      <Layout title='Cards'  colorBg = 'red' >
      <div className={style.flex} >
        {
          POKEMONS.map(item => <PokemonCard key={item.id}  name={item.name} type={item.type} img={item.img} values={item.values} id={item.id} />)
         
        }
      </div>
     
      </Layout>
      <Layout title='win condition' urlBg = {bg}>
      <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead. </p>

      
      </Layout>
      <Footer 
      title = 'THANKS FOR VISITING'
      descr = '© 2021 #ReactMarathon.' />
      </>

    )
  
}

export default HomePage;
