/**
 * This holds all item details and a button to buy an item
 */
import React, {Component} from 'react';


class ItemDetails extends Component {
  constructor() {
    super();
    this.state = {};
  }
  handleBuy = () => {
    //fetch buy endpoint
  };
  render() {
    return <div>
        <div className="Login">
          header<button>close pane</button>
        </div>
        <div>image</div>
        <div>Details text</div>
        Other Text/description
        <button>BUY</button>
        
      </div>;
  }
}

export default ItemDetails;
