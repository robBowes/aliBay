import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class Cart extends Component {
    trify = (x, k) => {
        return <tr>
            <td><img style={{'max-width'    :'80px'}} src={x.filename}/></td>
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
    return <div style={{ display: this.props.show ? "block" : "none" }} className="cartContainer card">
        <div className="carTable">
          CART
          <table style={{ width: "100%" }}>
            <tr>
              <th />
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
            </tr>
            {this.props.items.map(this.trify)}
          </table>
        </div>
        <button className="btn btn-lg">CHECKOUT</button>
        <div className='cartTotal'>{"$" + this.total(this.props.items)}</div>
      </div>;
  }
}

const mapStateToProps = state => ({
  show: state.view.cart,
  items: state.displayItems
});

export default connect(mapStateToProps)(Cart);