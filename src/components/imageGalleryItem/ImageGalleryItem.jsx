import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, onClick }) => {
    return (
        images.map(image => {
            return <li key={image.id} className={css['gallery-item']} onClick={onClick} >
                      <img src={image.webformatURL} alt={image.tags} title={image.largeImageURL} className={css.image} />
                    </li>
        })        
    )
}

ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
       }) 
    )
}