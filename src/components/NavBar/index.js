import style from './style.module.css';
import cn from 'classnames';
import {ReactComponent as LoginSVG } from '../../assets/login.svg';

const NavBar = ({isOpen, bgActive = false, setState, onClickLogin }) => {
  
    return (
        <nav id={style.navbar} className={cn(style.root, { [style.bgActive] : bgActive})}>
  <div className={style.navWrapper}>
    <p className={style.brand}>
      LOGO
    </p>

   <div className={style.loginAndMenu}>
     <div 
      onClick={onClickLogin} 
      className={style.loginWrap}>
     <LoginSVG />

     </div>
     <div onClick={setState}  className={cn(style.menuButton, {[style.active] : isOpen})}>
      <span />
    </div>
   </div>

  </div>
</nav>
    )
}
export default NavBar