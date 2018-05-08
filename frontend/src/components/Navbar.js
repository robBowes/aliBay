/**
 * A navigation bar to show at the top of every page
 */

import React, {Component} from 'react';
import styledComponent from 'styled-components';
import { Link, Router, BrowserRouter } from "react-router-dom";

let Nav = styledComponent.nav`
    
`;

class Navbar extends Component {
  render() {
    return (
      <div className="navBar">
        <img src="" alt="the bay logo" />
        <h1>The Bay</h1>
        <Link to='/'>
        <button onClick={this.props.toggleSellItem}>Sell Item</button>
      </Link>
      <Link to='/'><button style={{'display':!this.props.loggedIn?'none':'block'}}onClick={this.props.handleLogout}>Log out</button></Link>
      <Link to='/profile'><button>My Profile</button></Link>
      </div>
    );
  }
}

export default Navbar;
