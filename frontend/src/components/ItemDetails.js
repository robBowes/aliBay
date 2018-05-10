/**
 * This holds all item details and a button to buy an item
 */
import React, {Component} from 'react';
import {Link, Route, BrowserRouter} from 'react-router-dom';


class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {itemName: '',
      sellerName: '',
      listDate: '',
      price: '',
      itemDescription: '',
      quantity: '',
      class: 'hidden'
      },
    };
  }
  handleBuy = () => {
    if (this.state.item.quantity)
    {fetch('/buy', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        itemId: this.state.item.itemId,
        quantity: 1,
      }),
    })
    .then((res)=>res.json())
    .then((data)=>{
      this.props.getAllItems().then(()=>{
        this.setState({item: this.props.getItemById(this.props.items, this.props.id)});
      });
    });}
  };
  componentWillMount = () => {
    this.setState({item: this.props.getItemById(this.props.items, this.props.id)});
  }
  componentDidMount = () => {
        setTimeout(()=>this.setState({class: 'sellItems slideIn'}), 200);
    }
  render() {
    return <div className="itemDetails">
        <div className="itemMainCard">
          <div className="card-header">
            <h1 className="detailsName">{this.state.item.itemName}</h1>
            <div className="sellerName">
              {"Listed by " + this.state.item.sellerName}
            </div>
            <h1>
              <Link className="xButton" to="/">
                X
              </Link>
            </h1>
          </div>
          <div className="flexItem">
            <div className="itemImageContainer">
              <img className="itemImage" src={this.state.item.filename} />
            </div>
            <div>
              <h2>
                <br />
                <div className="itemPrice">
                  {"Price: $" + this.state.item.price.toLocaleString()}
                </div>
              </h2>
                <br />
            </div>
              <br />  
            <div className="itemDescription">  {this.state.item.itemDescription} </div>
          </div>
          <br />
          <button className="btn btn-primary btn-lg buyButton" onClick={this.handleBuy}>
            BUY
          </button>
                <div className='smallDetails'>
                {"List date: " + this.state.item.listDate}
              <br />
              {this.state.item.quantity + " left in stock."}
              <br/>
              {'ID#: '+this.state.item.itemId}</div>
        </div>
      </div>;
  }
}

export default ItemDetails;
