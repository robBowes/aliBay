/**
 * This holds all item details and a button to buy an item
 */
import React, {Component} from 'react';
import {Link, Route, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';


class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        itemName: '',
        sellerName: '',
        listDate: '',
        price: '',
        itemDescription: '',
        quantity: '',
      },
      class: 'hidden',
      classes: ['hidden', 'itemDetails', 'slideIn'],
    };
    this.id = props.id;
  }
  componentWillReceiveProps = (props) => {
    let item = props.items.find((el)=>el.itemId===this.id);
    if (item) this.setState({item});
  }
  handleBuy = () => {
    if (this.state.item.quantity) {
      fetch('/buy', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({
          itemId: this.state.item.itemId,
          quantity: 1,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.props.getAllItems().then(() => {
            this.setState({
              item: this.props.getItemById(this.props.items, this.props.id),
            });
            this.state.item.quantity===0?document.getElementById('buy').disabled = true:null;
          });
        });
    }
  };
  componentWillMount = () => {
    this.props.toggleShowItem();
    // this.setState({
    //   item: this.props.getItemById(this.props.items, this.props.id),
    // });
    // let newClass = this.props.itemDet ? "hidden itemDetails slideIn form-group" : "itemDetails slideIn form-group";
    // this.setState({ classes: newClass.split(" ") });
  };
   componentDidMount = () => {
     setTimeout(() => this.setState({classes: ['itemDetails', 'slideIn']}), 400);
  };


  render() {
    return (
      <div className={this.state.classes.join(' ')}>
        <div className="itemMainCard">
          <div className="card-header">
            <h1 className="detailsName">{this.state.item.itemName}</h1>
            <div className="sellerName">
              {'Listed by ' + this.state.item.sellerName}
            </div>
            <h1>
              <Link className="xButton" to="/" onClick={this.props.toggleShowItem}>
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
                  {'Price: $' + this.state.item.price.toLocaleString()}
                </div>
              </h2>
              <br />
            </div>
            <br />
            <div className="itemDescription">
              {' '}
              {this.state.item.itemDescription}{' '}
            </div>
          </div>
          <br />
          <button
            className="btn btn-primary btn-lg buyButton"
            onClick={this.state.item.quantity>0?this.handleBuy:null}
            style={this.state.item.quantity>0?{}:{'background-color': 'grey', 'border': 'none', 'color': 'darkgrey', 'outline': 'none !important'}}
            id='buy'
          >
            BUY
          </button>
          <div className="smallDetails">
            {'List date: ' + this.state.item.listDate}
            <br />
            {this.state.item.quantity + ' left in stock.'}
            <br />
            {'ID#: ' + this.state.item.itemId}
          </div>
        </div>
      </div>
    );
  }
}

const mapStatToProps = (state) => ({
  items: state.items,
});

const ConnectedItemDetails = connect(mapStatToProps)(ItemDetails);

export default ConnectedItemDetails;
