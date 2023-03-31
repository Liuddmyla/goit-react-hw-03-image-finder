import { Component } from "react";
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export default class Modal extends Component{

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
           this.props.onClose(); 
        }
    }

    render() {
    return (
        <div className={css.overlay} onClick={this.handleBackdropClick}>
            <div className={css.modal}>
                <img src={this.props.bigImage} alt='bigImage' />
           </div>
        </div>
    )
}    

}

Modal.propTypes = {
    bigImage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

