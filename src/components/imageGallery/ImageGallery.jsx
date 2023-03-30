import { Component } from "react";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Loader } from '../loader/Loader';
import  Button  from '../button/Button';

export default class ImageGallery extends Component {
    state = {
        images: [],
        error: null,
        status: 'idle',
        page: 1,
    }

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.imageName;
        const nextName = this.props.imageName;
        const URL = `https://pixabay.com/api/?q=${nextName}&page=${this.state.page}&key=33641920-b059883ebd7147c979fd953b4&image_type=photo&orientation=horizontal&per_page=12`;

        if (prevName !== nextName || prevState.page !== this.state.page) {
            this.setState({ status: 'pending' });

            fetch(URL).then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(new Error('Error!'))
            })
                .then(({ hits }) => {
                    if (hits.length === 0) {
                        toast.error('Sorry, there are no images matching your search query. Please try again.', {autoClose: 2000,});
                    }
                    this.setState(prevState => {
                        return { images:[...prevState.images, ...hits ], status: 'resolved' }
                    })
                } )
                .catch(error => this.setState({ error, status: 'rejected' }));
        }       
    }

    handleClick = () => {
        this.setState({ page: this.state.page + 1 });
    }

    render() {
        if (this.state.status === 'idle') {
            return <div></div>
        }

        if (this.state.status === 'pending') {
            return <div><Loader /></div>
        }

        if (this.state.status === 'rejected') {
            return <div>{ this.state.error.message}</div>
        }

        if (this.state.status === 'resolved' && this.state.images.length > 0) {
            return <ul className="gallery">
                <ImageGalleryItem images={this.state.images} />
                <Button onClick={ this.handleClick} />
            </ul>
        } 
    }
}

ImageGallery.propTypes = {
    imageName: PropTypes.string.isRequired,
}