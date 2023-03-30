import css from './Modal.module.css';

export const Modal = ({images}) => {
    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <img src={images.largeImageURL} alt={images.tags} />
           </div>
        </div>
    )
}

export default Modal;