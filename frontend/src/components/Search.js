/**
* Makes a search request to the server
*/
import React, {Component} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {connect} from 'react-redux';

let Bar = styled.div`
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
            .includes(event.target.value.toLowerCase())
        );
        this.props.dispatch({
            type: 'CHANGE_SHOWN_ITEMS',
            payload: newItems,
        });
    }
    sort = (event) => {
        this.props.dispatch({
            type: 'CHANGE_ORDER',
            payload: event.target.value,
        });
    }
    handleSubmit = (event)=>{
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
            <div class="search-container">
            <input
            className="form-control search-bar"
            style={{width: '50%', display: 'inline'}}
            type='text'
            placeholder='Search'
            value={this.state.searchContents}
            onChange={this.handleChange}/>
            <div class="form-group">
            <select class="custom-select" onChange={this.sort}>
            <option selected="" >Sort By Price</option>
            <option value="low" >Low to High</option>
            <option value="high">High to Low</option>
            {/* <option value="3">Three</option> */}
            </select>
            </div>
            </div>
            </form>
            </Bar>
        );
    }
}

const mapStateToProps = (state) => ({
    allItems: state.items,
    displayItems: state.displayItems,
});

export default connect(mapStateToProps)(Search);

