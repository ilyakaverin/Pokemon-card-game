import style from './style.module.css';
import cn from 'classnames';

const NavBar = ({isOpen, setState}) => {
    
    return (
        <nav className={style.root}>
  <div className={style.navWrapper}>
    <p className={style.brand}>
      LOGO
    </p>
    <a onClick={setState}  className={cn(style.menuButton, {[style.active] : isOpen === 'openMenu'})}>
      <span />
    </a>
  </div>
</nav>
    )
}
export default NavBar