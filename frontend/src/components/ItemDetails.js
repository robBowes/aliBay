/**
 * This holds all item details and a button to buy an item
 */
import React, {Component} from 'react';
import {Link, Route, BrowserRouter} from 'react-router-dom'


class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {itemName:'',
      sellerName: '',
      listDate: '',
      price: '',
      itemDescription: '',
      quantity: ''
      }
    };
  }
  handleBuy = () => {
    //fetch buy endpoint
  };
  componentWillMount = () => {
    this.setState({item: this.props.getItemById(this.props.items, this.props.id)})
  }
  render() {
    return <div className="itemDetails">
        <div>
          <h1>
            {this.state.item.itemName}
            <Link to="/">
              <button>close pane</button>
            </Link>
          </h1>
        </div>
        <div>
          <img src={"http://unsplash.it/" + Math.floor(Math.random() * (400 - 250) + 250) + "/" + Math.floor(Math.random() * (400 - 250) + 250)} />
        </div>
        <div>
          <h2>
            {"Seller Name: " + this.state.item.sellerName}
            <br />
            {"Price: $" + this.state.item.price.toLocaleString()}
            <br />
            {"List date: " + this.state.item.listDate}
          </h2>
          <br />
        </div>
        {this.state.item.itemDescription}
        <h3>{"quantity: " + this.state.item.quantity}</h3>
        <button>BUY</button>
      </div>;
  }
}

export default ItemDetails;
