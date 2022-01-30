import img from '../../../assets/contactme.webp';
import style from './style.module.css';

const AboutPage = () => {
   
    return (
        <div className={style.container}>
        <a href='https://github.com/ilyakaverin' className={style.href}> Github.com/ilyakaverin</a>
        <img src={img} alt="me" className={style.img} />
        </div>
    )
}

export default AboutPage;