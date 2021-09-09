import style from './style.module.css';

const Layout = ({title, descr, urlBg, colorBg  }) => {

    const bgRoot = urlBg ? { backgroundImage: `url(${urlBg}) ` } : {backgroundColor: colorBg} ;
    return (
        <section className={style.root} style={bgRoot}>
        <div className={style.wrapper}>
            <article>
                <div className={style.title}>
                    <h3>{title}</h3>
                    <span className={style.separator}></span>
                </div>
                <div className={[style.desc, style.full].join(' ')} > 
                    <p>{descr}</p>
                </div>
            </article>
        </div>
    </section>
    )
    
}
export default Layout