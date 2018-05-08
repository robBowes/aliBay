/**
 * A navigation bar to show at the top of every page
 */

import React, {Component} from 'react';
import styledComponent from 'styled-components';

let Nav = styledComponent.nav`
    
`;

class Navbar extends Component {
    render() {
        return (
            <div className="navBar">
                <img src="" alt="the bay logo"/>
                <h1>The Bay</h1>
                <button
                onClick={this.props.toggleSellItem}
                >Sell Item</button>
            </div>
        );
    }
}

export default Navbar;
