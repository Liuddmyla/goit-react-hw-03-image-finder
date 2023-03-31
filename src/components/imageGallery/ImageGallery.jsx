import { Component } from "react";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { Loader } from '../loader/Loader';
import  Button  from '../button/Button';
import  Modal  from '../modal/Modal';


export default class ImageGallery extends Component {
    state = {
        images: [],
        error: null,
        status: null,
        page: 1,
        ishidden: false,
        bigImage:''
    }

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.imageName;
        const nextName = this.props.imageName;
        const URL = `https://pixabay.com/api/?q=${nextName}&page=${this.state.page}&key=33641920-b059883ebd7147c979fd953b4&image_type=photo&orientation=horizontal&per_page=12`;
        
        if (prevName !== nextName) {
            this.setState({ status: 'pending', images: [], page: 1 });
            
            if (this.state.page === 1) {
                fetch(URL).then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(new Error('Error!'))
            })
                .then(({ hits }) => {
                    if (hits.length === 0) {
                        toast.error('Sorry, there are no images matching your search query. Please try again.', { autoClose: 2000, });
                    }
                    this.setState({ images: hits, status: 'resolved' })                    
                })
                .catch(error => this.setState({ error, status: 'rejected' }));
            }         
           
        }
        
        if (prevState.page !== this.state.page) {
            this.setState({ status: 'pending' });
           
            fetch(URL).then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(new Error('Error!'))
            })
                .then(({ hits }) => {
                    this.setState(prevState => {                        
                        return { images: [...prevState.images, ...hits], status: 'resolved' }
                    })
              })
                .catch(error => this.setState({ error, status: 'rejected' }));
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
                {this.state.status === 'pending' && this.state.images.length === 0 && <Loader />}
                {this.state.status === 'resolved' && this.state.images.length > 0 && (
                    <ul className={css.gallery}>
                        <ImageGalleryItem images={this.state.images} onClick={ this.handleOpenModal} />
                    </ul>
                )}
                {this.state.images.length > 11 && this.state.status === 'resolved' && (
                    <Button onClick={this.handleClick} />
                )}
                {this.state.images.length > 11 && this.state.status === 'pending' && (
                    <Loader />
                )}
                {this.state.status === 'rejected' && (<div>{this.state.error.message}</div>)}
                {this.state.ishidden && <Modal bigImage={this.state.bigImage} onClose={this.handleCloseModal} />}
            </div>
        )     
       
    }
}

ImageGallery.propTypes = {
    imageName: PropTypes.string.isRequired,
}