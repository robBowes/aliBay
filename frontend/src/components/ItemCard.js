/**
* Shown on results page with small image and item description
*/
import React, {Component} from 'react';
import styled from 'styled-components';
import {Route, BrowserRouter, Link} from 'react-router-dom';

let Card = styled.div`
margin: 0.5rem 0;
`;

class ItemCard extends Component {
  render() {
    return <Card className="card border-primary mb2">
    <Link to={'/item/' + this.props.item.itemId}>
    <h5 className="card-header">

    {this.props.item.itemName}
    </h5>
    <h6> {this.props.item.itemDescription} </h6>
    <p>Price $ {this.props.item.price} </p>
    </Link>
    </Card>;
  }
}

export default ItemCard;
