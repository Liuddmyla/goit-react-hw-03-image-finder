import PropTypes from 'prop-types';

const Bytton = ({onClick}) => {
    return (
        <button type="button" className="button" onClick={onClick}>Load more</button>
    )
}

Bytton.propTypes = {
    onClick: PropTypes.func.isRequired,      
}

export default Bytton;