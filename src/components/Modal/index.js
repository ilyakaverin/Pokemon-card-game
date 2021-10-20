import {useRef, useEffect} from 'react'
import cn from 'classnames'
import s from './style.module.css';
import img from '../../assets/loader.jpeg';

const Modal = ({isOpen, title, children, onCloseModal, isCreating}) => {

    const ModalRef = useRef()
    
    useEffect(() => {
        document.querySelector('body').style.overflow = isOpen ? 'hidden' : null;

    },[isOpen])
    const handleCloseModal = () => {
        onCloseModal && onCloseModal(false)
    }
    const handleClickRoot = (event) => {
        
        if(!ModalRef.current.contains(event.target)) {
            onCloseModal && onCloseModal(false)
        }
    }
    return (

        <div className={cn(s.root, { [s.open] : isOpen })} onClick={handleClickRoot} > 
        <div ref={ModalRef} className={s.modal}>
        <div className={s.head}>
			{title}
            <span onClick={handleCloseModal} className={s.btnClose}></span>
        </div> 
        <div className={s.content}>
        {isCreating ? <><img className={s.load} src={img} alt='load' /><span>Creating user</span></> : children }
        </div>
    </div>
</div>

    )
}

export default Modal