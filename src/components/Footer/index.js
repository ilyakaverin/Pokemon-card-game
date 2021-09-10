import style from './style.module.css';

const Footer = ({title, descr }) => {
    return (
        <footer>
        <div className={style.wrapper}>
        <h3>{title}</h3>
        <p>{descr}</p>
        </div>
    </footer>
    )
}
export default Footer;