import style from './style.module.css';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import {ReactComponent as LoginSVG } from '../../assets/login.svg';
import {ReactComponent as UserSVG } from '../../assets/pikachu.svg';
import { useSelector } from 'react-redux';
import { selectUserLoading, selectLocalId } from '../../store/users';


const NavBar = ({isOpen, bgActive = false, setState, onClickLogin }) => {

  const isLoading = useSelector(selectUserLoading);
  const localId = useSelector(selectLocalId);
    return (
        <nav id={style.navbar} className={cn(style.root, { [style.bgActive] : bgActive})}>
  <div className={style.navWrapper}>
    

   <div className={style.loginAndMenu}>
     { (!isLoading && !localId) && (
      <div 
      onClick={onClickLogin} 
      className={style.loginWrap}>
     <LoginSVG />
     </div>
     )}
     { (!isLoading && localId) && (
      <Link 
      className={style.loginWrap}
      to='/user'>
     <UserSVG />
     </Link>
     )}
     <div onClick={setState}  className={cn(style.menuButton, {[style.active] : isOpen})}>
      <span />
    </div>
   </div>

  </div>
</nav>
    )
}
export default NavBar