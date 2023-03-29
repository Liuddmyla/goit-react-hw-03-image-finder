import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images }) => {
    return (
        images.map(image => {
            return <li key={image.id} className="gallery-item">
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