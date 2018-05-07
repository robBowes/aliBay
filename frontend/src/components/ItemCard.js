/**
 * Shown on results page with small image and item description
 */
import React, {Component} from 'react';

class ItemCard extends Component {
    
    render() {
        return (
            <div>
                <h4> {this.props.item.itemName} </h4>
                <h5> {this.props.item.itemDescription} </h5>
                <h6> $ {this.props.item.price} </h6>
                <h6> {this.props.item.quantity} </h6>
            </div>
        );
    }
}

export default ItemCard;
