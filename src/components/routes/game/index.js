import style from './style.module.css';

const GamePage = ({onChangePage}) => {

    const handleClickButton = (page) => {
        onChangePage && onChangePage(page)
    }
    return (
      
      <button onClick={handleClickButton}>
            НА ГЛАВНУЮ 
        </button>
        
    )
}
export default GamePage;