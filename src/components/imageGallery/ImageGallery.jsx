import { Component } from "react";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Loader } from '../loader/Loader';
import  Button  from '../button/Button';
import  Modal  from '../modal/Modal';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
};

export default class ImageGallery extends Component {
    state = {
        images: [],
        error: null,
        status: null,
        page: 1,
        ishidden: false,
        bigImage: '',
        total: null
    }

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.imageName;
        const nextName = this.props.imageName;
        const URL = `https://pixabay.com/api/?q=${nextName}&page=${this.state.page}&key=33641920-b059883ebd7147c979fd953b4&image_type=photo&orientation=horizontal&per_page=12`;
        
        if (prevName !== nextName) {
            this.setState({ status: Status.PENDING, images: [], page: 1 });
            
            if (this.state.page === 1) {
                fetch(URL).then(response => {
                    if (response.ok) {
                        return response.json();                    
                }
                return Promise.reject(new Error('Error!'))
            })
                .then(({ hits, total }) => {
                    if (hits.length === 0) {
                        toast.error('Sorry, there are no images matching your search query. Please try again.', { autoClose: 2000, });
                    }
                    this.setState({ images: hits, status: Status.RESOLVED, total})             
                })
                .catch(error => this.setState({ error, status: Status.REJECTED }));
            }         
           
        }
        
        if (prevState.page !== this.state.page) {
            this.setState({ status: Status.PENDING });
           
            fetch(URL).then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(new Error('Error!'))
            })
                .then(({ hits }) => {
                    this.setState(prevState => {                        
                        return { images: [...prevState.images, ...hits], status: Status.RESOLVED }
                    })
              })
                .catch(error => this.setState({ error, status: Status.REJECTED }));
        }

        if (prevName === nextName) {
            let offsetHeight = document.documentElement.offsetHeight - 565;
                window.scrollTo({
                top: offsetHeight,
                behavior: 'smooth',
            })
        }
    }

    handleClick = () => {
        this.setState( prevState=>({ page: prevState.page + 1 }));
    }

    handleOpenModal = (e) => {
        this.setState({ ishidden: true, bigImage: e.target.title})             
    }

     handleCloseModal = (e) => {
        this.setState({ ishidden: false, bigImage: ''})             
    }

    render() {

        return (
            <div>               
                {this.state.images.length > 0 && (
                    <ul className={css.gallery}>
                        <ImageGalleryItem images={this.state.images} onClick={ this.handleOpenModal} />
                    </ul>
                )}
                {this.state.images.length > 11 && this.state.status === Status.RESOLVED && (this.state.total - this.state.images.length) > 0 && (
                    <Button onClick={this.handleClick} />
                )}
                {this.state.status === Status.PENDING  && <Loader />}
                {this.state.status === Status.REJECTED && (<div>{this.state.error.message}</div>)}
                {this.state.ishidden && <Modal bigImage={this.state.bigImage} onClose={this.handleCloseModal} />}
            </div>
        )     
       
    }
}

ImageGallery.propTypes = {
    imageName: PropTypes.string.isRequired,
}

