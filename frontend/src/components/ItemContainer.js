/**
 * Holds the list of items to be displayed to the user
 */

import React, {Component} from 'react';
import ItemCard from './ItemCard.js';
import {itemsObjToArray, getItemById} from '../utils.js';

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
        return (
            <div className='itemContainer'>
            {this.state.items.map(renderAllItems)}
            </div>
        );
    }
}

export default ItemContainer;
