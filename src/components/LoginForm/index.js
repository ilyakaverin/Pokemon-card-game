import {useState} from 'react';
import Input from './component/Input';
import style from './style.module.css';

const LoginForm = ({onSubmit}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signIn, setSignIn] = useState(null);
    const [event, setEvent] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault()

        onSubmit && onSubmit({
            email,
            password,
            signIn
        })
        setEmail('');
        setPassword('')
    }

    return (
        <form onSubmit={handleSubmit}>
        <Input
        value={email} 
        type='text' 
        name='email'
        label='email' 
        onChange={(event) => setEmail(event.target.value)} />

        <Input
            value={password} 
            type='password' 
            name='password'
            label='password' 
            onChange={(event) => setPassword(event.target.value)}
        />
        <div className={style.buttons}>
        <button onClick={event ? () => setSignIn(false) : () => setSignIn(true)} >
            {event ? 'Sign in' : 'Sign up'}
        </button>
        <p onClick={() => setEvent(prevState => !prevState)}> {event ? 'Login' : 'Register'} </p>
        </div>
        </form>

    )
    
}
export default LoginForm