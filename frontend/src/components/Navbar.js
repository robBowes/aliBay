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
    className="navBar navbar">

    <img src="" alt="the bay logo" />

    <Link to="/">

    <h1>The Bay</h1>

    </Link>

    <div className="navButtons nav nav-tabs">
    <div
    style={{height: '100%'}}
    // className={this.props.loggedIn ? btn : disabledBtn}
    className="nav-item fade show"
    onClick={this.props.toggleSellItem} >

    <Link
    // className={'nav-link ' + this.props.loggedIn?'disabled':''}
    className="nav-link"

    to="/">
    Sell Item
    </Link>

    </div>


    <div
    // className={'btn btn-info'+ ' '}
    style={{height: '100%'}}
    className="nav-item fade show"
    >
    <Link
    className="nav-link"
    to={!this.props.loggedIn?'/':'/profile/user'+this.props.userId}>
    My Profile
    </Link>
    </div>
    <div
    className="nav-item fade show"
    style={{height: '100%'}}
    onClick={this.props.handleLogout}>
    <Link className="nav-link" to="/">
    Log out
    </Link>
    </div>
    </div>
    </div>;
  }
}

export default Navbar;
