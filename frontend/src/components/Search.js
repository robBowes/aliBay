/**
 * Makes a search request to the server
 */
import React, {Component} from 'react';
import styled from 'styled-components'

let Bar = styled.div`
    margin: 0.5rem;
`;

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
        console.log('search');
        event.preventDefault();
        fetch('/search', {
            method: 'POST', body: JSON.stringify({query: this.state.searchContents}),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.content);
            this.props.updateItems(data.content);
        });
    }
    render() {
        return (
            <Bar className="search">
                <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Search' value={this.state.searchContents} onChange={this.handleChange}/>
                    <input type='submit' />
                </form>
            </Bar>
        );
    }
}

export default Search;
