/**
 * Makes a search request to the server
 */
import React, {Component} from 'react';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchContents: '',
        };
    }
    handleChange = (event)=>{
        event.preventDefault();
        this.setState({searchContents: event.target.value});
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        
    }
    render() {
        return (
            <div className="search">
                <form>
                    <input type='text' value={this.state.searchContents} onChange={this.handleChange}/>
                    <input type='submit' onSubmit={this.handleSearch}/>
                </form>
            </div>
        );
    }
}

export default Search;
