/**
* A window to sell items
*/

import React, {Component} from 'react';

class SellItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
        };
    };
    handleSubmit = (event) => {
        event.preventDefault();
    };
    render() {
        return (
            <div className='sellItems'>
            <form onSubmit={this.handleSubmit}>
            </form>
            </div>
        );
    }
}

export default SellItems;
