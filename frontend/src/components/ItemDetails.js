/**
 * This holds all item details and a button to buy an item
 */
import React, {Component} from 'react';
import {Link, Route, BrowserRouter} from 'react-router-dom'


class ItemDetails extends Component {
  constructor() {
    super();
    this.state = {};
  }
  handleBuy = () => {
    //fetch buy endpoint
  };
  render() {
    return <div className="itemDetails">
        <div>
          header<Link to='/'><button>close pane</button></Link>
        </div>
        <div>image</div>
        <div>Details text</div>
        Other Text/description
        <button>BUY</button>
      </div>;
  }
}

export default ItemDetails;
