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
    className="navBar navbar navbar-dark navbar-expand-lg  bg-dark">

    <img src="" alt="the bay logo" />

    <Link to="/">

    <a className="navbar-brand">Key-Bay</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    </Link>
    <div className='collapse navbar-collapse navbar'>

    <ul className="navButtons navbar-nav ml-auto">
    <li
    style={{height: '100%'}}
    // className={this.props.loggedIn ? btn : disabledBtn}
    className="nav-item "
    onClick={this.props.toggleSellItem} >

    <Link
    // className={'nav-link ' + this.props.loggedIn?'disabled':''}
    className="nav-link"

    to="/">
    Sell Item
    </Link>
    </li>
    <li
    style={{height: '100%'}}
    className="nav-item "
    >
    <Link
    className="nav-link"
    to={!this.props.loggedIn?'/':'/profile/user'+this.props.userId}>
    My Profile
    </Link>
    </li>
    <li
    className="nav-item "
    style={{height: '100%'}}
    onClick={this.props.handleLogout}>
    <Link className="nav-link" to="/">
    Log out
    </Link>
    </li>
    </ul>
    </div>
    </div>;
  }
}

export default Navbar;
