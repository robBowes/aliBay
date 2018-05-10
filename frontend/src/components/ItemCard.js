/**
* Shown on results page with small image and item description
*/
import React, {Component} from 'react';
import styled from 'styled-components';
import {Route, BrowserRouter, Link} from 'react-router-dom';

let Card = styled.div`
   border-radius: 0;
`;

class ItemCard extends Component {
  render() {
    return <Card className="card border-secondary mb2">

    <Link to={'/item/' + this.props.item.itemId}>

    {/* <div className="cardBody"> */}
    <div className='smallItemCard'>
    <img className="smallCardImage" src={this.props.item.filename} alt=""/>
{/*     
    </div>
    <div className="itemTextContainer">
    <h5 className="itemName">
    {this.props.item.itemName}
    </h5>
    <div>
        <br/>
    <h6 className='cardDescription'> {this.props.item.itemDescription} </h6>
    </div></div> */}
   

    <p className='cardPrice'>  {'$ '+this.props.item.price.toLocaleString()} </p></div>

    </Link>
    </Card>;
  }
}

export default ItemCard;
