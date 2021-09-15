import {useState} from 'react'
import Menu from '../Menu/index';
import NavBar from '../NavBar/index';


const MenuHeader = () => {
    const [isActive, setActive] = useState('initial');

    const handle = () => {
        isActive === 'initial' ? setActive('openMenu') : setActive('closedMenu')
    }

    return (
        <>
        <Menu isOpen={isActive} />
        <NavBar setState={handle} isOpen={isActive} />
        </>
    )
}
export default MenuHeader;