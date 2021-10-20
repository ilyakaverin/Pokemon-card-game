import {useState, useEffect} from 'react';
import Input from './component/Input';
import style from './style.module.css';

const LoginForm = ({onSubmit, isResetField = false}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signIn, setSignIn] = useState(true);

    useEffect(() => {
        setEmail('');
        setPassword('');

    },[isResetField])

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
        <>
        <form onSubmit={handleSubmit}>
        <Input
        value={email} 
        type='text' 
        name='Email'
        label='Email' 
        onChange={(event) => setEmail(event.target.value)} />

        <Input
            value={password} 
            type='password' 
            name='Password'
            label='Password' 
            onChange={(event) => setPassword(event.target.value)}
        />
        <div className={style.buttons}>
        <button className={style.login}>
            { signIn ? 'Sign in' : 'Sign up'}
        </button>
        <div 
        onClick={() => setSignIn(prevState => !prevState)}>
         { signIn ? 'Register?' : 'Login?'} 
         </div>
        </div>
        
        </form>
        
        </>

    )
    
}
export default LoginForm