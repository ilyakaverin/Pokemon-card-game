import style from './style.module.css';
import MenuHeader from '../../MenuHeader/index';

const GamePage = ({onChangePage, }) => {

    const handleClickButton = (page) => {
        onChangePage && onChangePage(page)
    }
    return (
      <>
      <MenuHeader />
      
      <button className={style.backButton} onClick={handleClickButton}>
            НА ГЛАВНУЮ 
        </button>
        
      </>
        
    )
}
export default GamePage;