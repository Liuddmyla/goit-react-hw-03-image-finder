import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images }) => {
    return (
        images.map(image => {
            return <li key={image.id} className={css['gallery-item']}>
                      <img src={image.webformatURL} alt={image.tags} />
                    </li>
        })        
    )
}

ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags:  PropTypes.string.isRequired,
       }) 
    )
}