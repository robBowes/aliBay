import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class Cart extends Component {
    constructor(){
        super();
        this.state={
            cart: []
        }
    }
  getCart = () => {
    console.log(this.props.userId);
    return fetch("/user", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({ userId: parseInt(this.props.userId) })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        this.props.dispatch({ type: "UPDATE_CART", payload: data.cart });
      })
     ;
  };
 
  renderCartById = () => {
      console.log(this.props.items)
    if(!this.props.items){
        return
    }
    let cartIds = Object.keys(this.props.items)
    let cartItems = []
    cartItems = cartIds.map((x,k)=>{
        return this.props.allItems.filter(y=>{
            return y.itemId === x
        })
    })
    console.log(cartItems)
    return cartItems[0];
  };
  trify = (x, k) => {
    return (
      <tr>
        <td>
          <img style={{ "max-width": "100px" }} src={x.filename} />
        </td>
        <td>{x.itemName}</td>
        <td>{"$" + x.price}</td>
        <td>{this.props.items[x.itemId]}</td>
      </tr>
    );
  };
  componentWillMount= ()=>{
      this.getCart().then(x => {
        if (this.state.cart.length < 1) {
          this.setState({ cart: this.renderCartById() });
        }
      });
  }

  total = x => {
    console.log(x);
    if (x.length >= 1) {
      return x.reduce((a, b) => {
        console.log(a.price, b.price);
        return a + parseInt(b.price) * parseInt(this.props.items[b.itemId]);
      }, 0);
    }
    return 0;
  };
  render() {
    console.log(this.props);
    return (
      <div
        style={{ display: this.props.show ? "block" : "none" }}
        className="cartContainer card"
      >
        <div className="carTable">
          CART
          <table style={{ width: "100%" }}>
            <tr>
              <th />
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
            </tr>
            {this.state.cart?this.state.cart.map(this.trify):null}
          </table>
        </div>
        <button className="btn btn-lg">CHECKOUT</button>
        <div className="cartTotal">{"$" + this.total(this.state.cart)}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  show: state.view.cart,
  items: state.user.cart,
  userId: state.user.userId,
  allItems: state.items
});

export default connect(mapStateToProps)(Cart);
