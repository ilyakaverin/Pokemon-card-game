import {useState} from 'react'
import Menu from '../Menu/index';
import NavBar from '../NavBar/index';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { getUserUpdateAsync } from '../../store/users';




const MenuHeader = ({bgActive}) => {
    const [isActive, setActive] = useState(null);
    const [isOpenModal, setModalState] = useState(false)
    const dispatch = useDispatch();
    const [creating, setCreating] = useState(false);

    const handle = () => {
        setActive(prevState => !prevState)
    }
    const handleClickLogin = () => {
        setModalState(prevState => !prevState)
    }
    const authEvent = async ({email, password, signIn}) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        }
        switch(signIn) {
            case true:
                return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvP_1qO7amCQplRNx1M2kgZPk37Wo99LA',requestOptions).then(res => res.json());
            case false:
                setCreating(true)
                return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvP_1qO7amCQplRNx1M2kgZPk37Wo99LA', requestOptions)
                .then(res => res.json())

            default: 
                return 'error'

        }

    }
    const handleSubmitLoginForm = async (props) => {

        const response = await authEvent(props);
            if(response.hasOwnProperty('error')) {
                NotificationManager.error(response.error.message, 'wrong');
                setCreating(false);
            } else {
                if(props.signIn === false) {
                    const data = {
                        wins: 0,
                        draw: 0,
                        lose: 0
                    }
                    await fetch(`https://pokemon-game-ca189-default-rtdb.asia-southeast1.firebasedatabase.app/${response.localId}/stats.json?auth=${response.idToken}`, {
                        method: 'POST',
                        body: JSON.stringify(data)
                    })
                    const pokemonStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());
                    for(const item of pokemonStart.data) {

                        await fetch(`https://pokemon-game-ca189-default-rtdb.asia-southeast1.firebasedatabase.app/${response.localId}/pokemons.json?auth=${response.idToken}`, {
                            method: 'POST',
                            body: JSON.stringify(item)
                        });
                    }
                }
                localStorage.setItem('idToken', response.idToken);
                NotificationManager.success('DONE', 'priwel k uspehu');
                dispatch(getUserUpdateAsync());
                handleClickLogin();
                setCreating(false);
            }
     
    }

    return (
        <>
        <Menu  isOpen={isActive} setState={setActive} />
        <NavBar 
            setState={handle} 
            isOpen={isActive} 
            bgActive={bgActive}
            onClickLogin={handleClickLogin} />
                <Modal
                    isCreating={creating} 
                    title="Login" 
                    onCloseModal={handleClickLogin}
                    isOpen={isOpenModal}
                    >
                    <LoginForm
                    onSubmit={handleSubmitLoginForm}
                    isResetField={!isOpenModal}
                     />

                    </Modal>
        </>
    )
}
export default MenuHeader;