/**
* A navigation bar to show at the top of every page
*/

import React, {Component} from 'react';
import styledComponent from 'styled-components';
import {Link, Router, BrowserRouter} from 'react-router-dom';

let Nav = styledComponent.nav`

`;

const btn = 'btn btn-info';
const disabledBtn = 'btn btn-info disabled';

class Navbar extends Component {
  render() {
    return <div
    className="navBar">

    <img src="" alt="the bay logo" />

    <Link to="/">

    <h1>The Bay</h1>

    </Link>

    <div className="navButtons">
    <Link to="/">
    <button
    style={{height: '100%'}}
    className={this.props.loggedIn ? btn : disabledBtn}
    onClick={this.props.toggleSellItem} >
    Sell Item
    </button>

    </Link>


    <Link to={!this.props.loggedIn?'/':'/profile/user'+this.props.userId}>
    <button
    // className={'btn btn-info'+ ' '}
    style={{height: '100%'}}
    className={this.props.loggedIn ? btn : disabledBtn}
    >
    My Profile
    </button>
    </Link>
    <Link to="/">
    <button
    className={this.props.loggedIn ? btn : disabledBtn}
    style={{height: '100%'}}
    onClick={this.props.handleLogout}>
    Log out
    </button>
    </Link>
    </div>
    </div>;
  }
}

export default Navbar;
