import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class Cart extends Component {
    trify = (x, k) => {
        return <tr>
            <td><img style={{'max-width'    :'50px'}} src={x.filename}/></td>
            <td>{x.itemName}</td>
            <td>{'$'+x.price}</td>
            <td>{x.quantity}</td>
          </tr>;
    }
    total = (x) =>{
        console.log(x)
        if(x.length>=1){
        return x.reduce((a,b)=>{
            console.log(a.price, b.price)
            return a + (parseInt(b.price)*parseInt(b.quantity))
        },0)}
        return 0

    }
  render() {
    console.log(this.props);
    return (
      <div
        style={{ display: this.props.show ? "block" : "none",
    'overflow':'scroll' }}
        className="cartContainer card"
      >
      CART
      <table style={{'width':'100%'}}>
          <tr>
              <th></th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
          </tr>
          {this.props.items.map(this.trify)}
          <tr>
              
              <td colspan='2' style={{'text-align':'right'}}>{'$'+this.total(this.props.items)}</td>
              </tr>
      </table>
      <button className='btn btn-lg'>CHECKOUT</button>
      
      </div>
    );
  }
}

const mapStateToProps = state => ({
  show: state.view.cart,
  items: state.displayItems
});

export default connect(mapStateToProps)(Cart);
