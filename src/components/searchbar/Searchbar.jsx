import { Component } from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {ReactComponent as SearchIcon} from "../icons/search.svg";

export default class Searchbar extends Component{
    state = {
       imageName: '',
    }

    handleNameChange = (e) => {
        this.setState({ imageName: e.currentTarget.value.toLowerCase() });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.imageName.trim() === '') {
            return toast.info('Enter a name for the image !', {autoClose: 2000,});
           
        }

        this.props.onSubmit(this.state.imageName);
        this.setState({ imageName: '' });

    }

    render() {
        return (
            <header className="searchbar"> 
                <form onSubmit={this.handleSubmit} className="form">
                    <button type="submit" className="button">
                      <span className="button-label"><SearchIcon /></span>
                    </button>

                    <input
                        className="input"
                        type="text"
                        // autocomplete="off"
                        // autofocus
                        placeholder="Search images and photos..."
                        value={this.state.imageName}
                        onChange={this.handleNameChange}
                    />
                </form>
            </header>
        )
    
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,      
}