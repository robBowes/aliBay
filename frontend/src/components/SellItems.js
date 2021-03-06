/**
 * A window to sell items
 */

import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Sell = styled.div`
  padding: 2rem;
`;

class SellItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      itemDescription: '',
      itemQuantity: '',
      itemPrice: '',
      response: '',
      filename: '',
      class: 'hidden',
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (
      !this.state.itemName ||
      !this.state.itemDescription ||
      !this.state.itemPrice ||
      !this.state.itemQuantity
    ) {
      alert('Enter a valid item');
      return;
    }
    fetch('/addItem', {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify({
        itemName: this.state.itemName,
        itemDescription: this.state.itemDescription,
        quantity: this.state.itemQuantity,
        price: this.state.itemPrice,
        sellerId: this.props.userId,
        filename: this.state.filename,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({response: data.reason});
      });
    this.props.dispatch({
      type: 'TOGGLE_SELL_ITEM',
    });
    this.props.getAllItems().then(() => {
      this.props.showAllItems();
    });
    this.setState({
      itemName: '',
      itemDescription: '',
      itemQuantity: '',
      itemPrice: '',
      response: '',
      filename: '',
      response: '',
    });
  };
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };
  componentDidMount = () => {
    setTimeout(() => this.setState({class: 'sellItems slideIn'}), 200);
  };
  uploadPicture = (image) => {
    console.log(image);
    let filename = image.name;
    let extension = filename.split('.').pop();
    fetch('/pic?ext=' + extension, {
      method: 'POST',
      credentials: 'same-origin',
      body: image,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          alert('Error!');
          return new Error('upload');
        }
        console.log(data);
        this.setState({filename: data.content});
      })
      .catch((e) => console.log(e));
  };
  render() {
    return (
      <Sell
        className={
          this.props.showSellItem
            ? 'sellItems slideIn'
            : 'hidden sellItems slideIn'
        }
      >
        <div className="sellWidth">
        <div className="card border-secondary ">
          <div>

          <h3 className="card-header">Sell Item</h3>
          <Link className="xButton" to="/" onClick={()=>this.props.dispatch({
            type: 'TOGGLE_SELL_ITEM',
          })}>
                X
              </Link>
          </div>
            <div className="sellForm">
          <form className="card-body" onSubmit={this.handleSubmit}>
            <label htmlFor="itemName">Item Name</label> <br />
            <input
              className="sellName"
              type="text"
              id="itemName"
              name="itemName"
              value={this.state.itemName}
              onChange={this.handleChange}
            />{' '}
            <br />
            <label htmlFor="itemDescription">Description</label> <br />
            <textarea
              className="sellDescription"
              type="text"
              id="itemDescription"
              name="itemDescription"
              value={this.state.itemDescription}
              onChange={this.handleChange}
            />{' '}
            <br />
            <div className='bottomBox'>
            <div className='divideForm'>
            <label htmlFor="itemQuantity">Quantity</label> <br />
            <input
              type="number"
              className="sellQuantity"
              id="itemQuantity"
              name="itemQuantity"
              value={this.state.itemQuantity}
              onChange={this.handleChange}
            />{' '}</div>
            <div className='divideForm'>
            <label htmlFor="itemPrice">Price</label> <br />
            <input
              className="sellPrice"
              type="number"
              id="itemPrice"
              name="itemPrice"
              value={this.state.itemPrice}
              onChange={this.handleChange}
            />{' '}</div>
            </div>
            <br />
            <div className="bottomBox   ">
            <input
              type="file"
              className="btn btn-primary smallMargin sellFile"
              id="input"
              onChange={(e) => this.uploadPicture(e.target.files[0])}
              accept="image"
            />{' '}

            <input
              className="btn btn-primary smallMargin sellBtn"
              type="submit"
              value="Submit"
            />{' '}
            <br />
            </div>
          </form>

          <div className="response">{this.state.response}</div>
        </div>
        </div>
        </div>
      </Sell>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userId,
  showSellItem: state.view.showSellItem,
});

export default connect(mapStateToProps)(SellItems);
