/**
* Holds the list of items to be displayed to the user
*/

import React, {Component} from 'react';
import ItemCard from './ItemCard.js';
import {itemsObjToArray, getItemById} from '../utils.js';
import {connect} from 'react-redux';


class ItemContainer extends Component {
    renderAllItems = () => {
        // This function will render <ItemCard/> components for each Item
        // in item array
        let items = this.props.items;
        if (this.props.order === 'low' || this.props.order === 'high') {
            items = items.sort((a, b)=>{
                let ret = this.props.order === 'low'?
                parseInt(a.price)-parseInt(b.price) :
                parseInt(b.price)-parseInt(a.price);
                return ret;
            });
        }
        return (items.map((item, index)=>(
            <ItemCard item={item} key={'item'+index}/>
        )));
    };
    render() {
        return (
            <div className='itemContainer'>
            {this.props.items?this.renderAllItems():null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.displayItems,
        order: state.view.order,
    };
};

const ConnectedItemContainer = connect(mapStateToProps)(ItemContainer);

export default ConnectedItemContainer;
