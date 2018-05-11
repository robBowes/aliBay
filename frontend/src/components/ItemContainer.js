/**
 * Holds the list of items to be displayed to the user
 */

import React, {Component} from 'react';
import ItemCard from './ItemCard.js';
import {itemsObjToArray, getItemById} from '../utils.js';
import {connect} from 'react-redux';

let renderAllItems = (item, index) => {
    // This function will render <ItemCard/> components for each Item
    // in item array
    return <ItemCard item={item} key={'item'+index}/>;
  };

class ItemContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items,
        };
    }
    componentWillReceiveProps = (props) => {
        this.setState({items: props.items});
    }
    render() {
        // console.log(this.props);
        return (
            <div className='itemContainer'>
            {this.props.items?this.props.items.map(renderAllItems):null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        items: state.displayItems,
    };
};

const ConnectedItemContainer = connect(mapStateToProps)(ItemContainer);

export default ConnectedItemContainer;
