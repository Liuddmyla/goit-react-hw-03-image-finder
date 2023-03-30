import PropTypes from 'prop-types';
import css from './Button.module.css';

const Bytton = ({onClick}) => {
    return (
        <button type="button" className={css.button} onClick={onClick}>Load more</button>
    )
}

Bytton.propTypes = {
    onClick: PropTypes.func.isRequired,      
}

export default Bytton;