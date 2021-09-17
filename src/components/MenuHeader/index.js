import {useState} from 'react'
import Menu from '../Menu/index';
import NavBar from '../NavBar/index';


const MenuHeader = ({bgActive}) => {
    const [isActive, setActive] = useState(null);

    const handle = () => {
        setActive(prevState => !prevState)
    }

    return (
        <>
        <Menu isOpen={isActive} setState={setActive} />
        <NavBar setState={handle} isOpen={isActive} bgActive={bgActive} />
        </>
    )
}
export default MenuHeader;