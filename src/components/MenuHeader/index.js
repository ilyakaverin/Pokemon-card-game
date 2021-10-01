import {useState} from 'react'
import Menu from '../Menu/index';
import NavBar from '../NavBar/index';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
import { NotificationManager } from 'react-notifications';



const MenuHeader = ({bgActive}) => {
    const [isActive, setActive] = useState(null);
    const [isOpenModal, setModalState] = useState(false)

    const handle = () => {
        setActive(prevState => !prevState)
    }
    const handleClickLogin = () => {
        setModalState(prevState => !prevState)
    }
    const handleSubmitLoginForm = async ({email, password, signIn}) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecurityToken: true
            })
        }
        if(signIn) {
            const signResponse = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvP_1qO7amCQplRNx1M2kgZPk37Wo99LA',requestOptions).then(res => res.json());
            if(signResponse.hasOwnProperty('error')) {
                NotificationManager.error(signResponse.error.message, 'wrong');
            } else {
                localStorage.setItem('idToken', signResponse.idToken)
                NotificationManager.success('DONE', 'priwel k uspehu');
            }
        } else {
            const response = await 
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvP_1qO7amCQplRNx1M2kgZPk37Wo99LA', requestOptions).then(res => res.json())
            
            if(response.hasOwnProperty('error')) {
                NotificationManager.error(response.error.message, 'EST TAKOI');
            } else {
                localStorage.setItem('idToken', response.idToken)
                NotificationManager.success('DONE', 'priwel k uspehu');
            }
        }
     
    }

    return (
        <>
        <Menu isOpen={isActive} setState={setActive} />
        <NavBar 
            setState={handle} 
            isOpen={isActive} 
            bgActive={bgActive}
            onClickLogin={handleClickLogin} />
            <Modal 
                    title="Login" 
                    onCloseModal={handleClickLogin}
                    isOpen={isOpenModal}
                    >
                    <LoginForm
                    onSubmit={handleSubmitLoginForm}
                     />

                    </Modal>
        </>
    )
}
export default MenuHeader;