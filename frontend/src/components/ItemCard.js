/**
 * Shown on results page with small image and item description
 */
import React, {Component} from 'react';
import styled from 'styled-components';

let Card = styled.div`
margin: 0.5rem 0;
`;

class ItemCard extends Component {
    render() {
        return (
            <Card className='card border-primary mb2'>
                <h5 className='card-header'> {this.props.item.itemName} </h5>
                <h6> {this.props.item.itemDescription} </h6>
                <p>Price $ {this.props.item.price} </p>
                <p>Left in stock: {this.props.item.quantity} </p>
            </Card>
        );
    }
}

export default ItemCard;
