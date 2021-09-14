import {useState} from 'react'
import Menu from '../Menu/index';
import NavBar from '../NavBar/index';


const MenuHeader = () => {
    const [isActive, setActive] = useState(false);


    return (
        <>
        <Menu isOpen={isActive} />
        <NavBar setState={setActive} isOpen={isActive} />
        </>
    )
}
export default MenuHeader;