import style from './style.module.css';
import cn from 'classnames';

const NavBar = ({isOpen, setState}) => {
    const handle = () => {
        console.log('####: setOpen', isOpen)
        isOpen ? setState(false) : setState(true)
    }
    return (
        <nav className={style.root}>
  <div className={style.navWrapper}>
    <p className={style.brand}>
      LOGO
    </p>
    <a onClick={handle}  className={cn(style.menuButton, {[style.active] : isOpen})}>
      <span />
    </a>
  </div>
</nav>
    )
}
export default NavBar