import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';

export default class App extends Component {
  state = {
    imageName: '',
   
  }

  handleFormSubmit = (imageName) => {
    this.setState({imageName})
  }

  render() {
    return (
      <div>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imageName={this.state.imageName} />
      </div>
    )
  }
  
}

