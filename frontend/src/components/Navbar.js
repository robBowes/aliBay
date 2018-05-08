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
            </div>
        );
    }
}

export default Navbar;
