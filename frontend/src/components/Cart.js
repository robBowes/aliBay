import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import StripeButton from './StripeButton';


class Cart extends Component {
    constructor() {
        super();
        this.state={
            cart: [],
            loading: true,
        };
    }
  getCart = () => {
    return fetch('/user', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({userId: parseInt(this.props.userId)}),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.dispatch({type: 'UPDATE_CART', payload: data.cart});
        this.setState({loading: false});
      })
     ;
  };

  renderCartById = () => {
    if (!this.props.items) {
        return;
    }
    let cartIds = Object.keys(this.props.items);
    let cartItems = [];
    cartItems = cartIds.map((x, k)=>{
        return this.props.allItems.filter((y)=>{
            return y.itemId === x;
        });
    });
    return cartItems[0];
  };
  trify = (x, k) => {
    return (
      <tr>
        <td>
          <img style={{'maxWidth': '100px'}} src={x.filename} />
        </td>
        <td>{x.itemName}</td>
        <td>{'$' + x.price}</td>
        <td>{this.props.items[x.itemId]}</td>
      </tr>
    );
  };
  componentWillMount= ()=>{
      this.getCart().then((x) => {
        if (this.state.cart.length < 1) {
          this.setState({cart: this.renderCartById()});
        }
      });
  }

  total = (x) => {
    if (x.length >= 1) {
      return x.reduce((a, b) => {
        return a + parseInt(b.price) * parseInt(this.props.items[b.itemId]);
      }, 0);
    }
    return 0;
  };
  render() {
    return this.state.loading? <div className="userProfileContainer slideIn"
    style={
      {'backgroundColor': 'rgba(0, 0, 0, 0.514'}
    }>
    </div>:(
      <div
        style={{display: this.props.show ? 'block' : 'none'}}
        className="cartContainer card"
      >
        <div className="carTable">
          CART
          <table style={{width: '100%'}}>
          <tbody>

            <tr>
              <th />
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
            </tr>
            {this.state.cart?this.state.cart.map(this.trify):null}
          </tbody>
          </table>
        </div>
        <button className="btn btn-lg">CHECKOUT</button>
        <StripeButton />
        <div className="cartTotal">{'$' + this.total(this.state.cart)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  show: state.view.cart,
  items: state.user.cart,
  userId: state.user.userId,
  allItems: state.items,
});

export default connect(mapStateToProps)(Cart);
