/**
 * Makes a search request to the server
 */
import React, {Component} from 'react';

class Search extends Component {
    handleChange = (event)=>{

    }
    handleSubmit = (event)=>{
        event.preventDefault();
    }
    render() {
        return (
            <div className="search">
                <form>
                    <input type='text' onChange={this.handleChange}/>
                    <input type='submit' onSubmit={this.handleSearch}/>
                </form>
            </div>
        );
    }
}

export default Search;
