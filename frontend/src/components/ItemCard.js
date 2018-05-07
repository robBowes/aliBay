/**
 * Shown on results page with small image and item description
 */
import React, {Component} from 'react';

class ItemCard extends Component {
    constructor(){
        super();
        this.state={
            
        }
    }
    handleBuy = () => {
        //fetch buy endpoint
    }
    render() {
        return (
            <div>
                <div>header<button>close pane</button></div>
                <div>image</div>
                <div>Details text</div>
                Other Text/description
                <button>BUY</button>
            </div>
        );
    }
}

export default ItemCard;
