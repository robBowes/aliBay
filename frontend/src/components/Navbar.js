/**
* A navigation bar to show at the top of every page
*/

import React, {Component} from 'react';
import styledComponent from 'styled-components';
import {Link, Router, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';

let Nav = styledComponent.nav`

`;

const btn = 'btn btn-info';
const disabledBtn = 'btn btn-info disabled';

class Navbar extends Component {
  render() {
    return <nav
    className="navBar navbar navbar-expand-lg navbar-dark bg-dark avbar-toggleable-md">

    <Link className="navbar-brand" style={{height: '100%'}} to="/">
    <img className ="logo" src="/keybaylogo.png" alt="the bay logo" style={{height: '90%'}}/>
    </Link>

    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation" style={{}}>
    <span className="navbar-toggler-icon "></span>
    </button>

    <div className='navbar-collapse collapse' id="navbarColor02">
    <ul className="navbar-nav ml-auto">

    <li
    // style={{height: '100%'}}
    className="nav-item active"
    onClick={this.props.toggleSellItem} >
    <Link
    className="nav-link"
    href='#'
    to="/">
    Sell Item
    </Link>
    </li>

    <li
    // style={{height: '100%'}}
    className="nav-item" >
    <Link
    className="nav-link"
    href='#'
    to={!this.props.loggedIn?'/':'/profile/user'+this.props.userId}>
    My Profile
    </Link>
    </li>

    <li
    className="nav-item "
    // style={{height: '100%'}}
    onClick={
      ()=>{
        this.props.dispatch({
          type: 'LOGOUT',
        });
        document.cookie='';
      }
    }>
    <Link className="nav-link" href='#' to="/">
    Log out
    </Link>
    </li>

    </ul>
    </div>
    </nav>;
  }
}


export default connect()(Navbar);

