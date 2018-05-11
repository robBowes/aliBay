/**
 * Makes a search request to the server
 */
import React, {Component} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {connect} from 'react-redux';

let Bar = styled.div`
    margin: 0.5rem;
`;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContents: '',
        };
    }
    handleChange = (event)=>{
        event.preventDefault();
        this.setState({searchContents: event.target.value});
        let newItems = _.filter(this.props.allItems,
            (x)=>x.itemName
            .toLowerCase()
            .includes(event.target.value.toLowerCase()));
        // this.props.changeShownItems(newItems);
        // console.log(newItems);
        this.props.dispatch({
            type: 'CHANGE_SHOWN_ITEMS',
            payload: newItems,
        });
    }
    handleSubmit = (event)=>{
        console.log('search');
        event.preventDefault();
        fetch('/search', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(
                {query: this.state.searchContents}
            ),
        })
        .then((res)=>res.json())
        .then((data)=>{
            this.props.changeShownItems(data.content);
        });
    }
    render() {
        return (
            <Bar className="search">
                <form onSubmit={this.handleSubmit}>
                    <input
                    className="form-control"
                    style={{width: '50%', display: 'inline'}}
                    type='text'
                    placeholder='Search'
                    value={this.state.searchContents}
                    onChange={this.handleChange}/>
                    <input
                    className ="btn btn-primary"
                    id = "search-button"
                    type='submit' />
                </form>
            </Bar>
        );
    }
}

const mapStateToProps = (state) => ({
    allItems: state.items,
});

export default connect(mapStateToProps)(Search);
