import style from './style.module.css';
import cn from 'classnames';

const NavBar = ({isOpen, bgActive = false, setState}) => {
    
    return (
        <nav id={style.navbar} className={cn(style.root, { [style.bgActive] : bgActive})}>
  <div className={style.navWrapper}>
    <p className={style.brand}>
      LOGO
    </p>
    <div onClick={setState}  className={cn(style.menuButton, {[style.active] : isOpen})}>
      <span />
    </div>
  </div>
</nav>
    )
}
export default NavBar