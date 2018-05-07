import React, {Component} from 'react';
import logo from './logo.svg';
import {Route, BrowserRouter, Link} from 'react-router-dom';
import './App.css';
import Login from './components/Login.js';
import NavBar from './components/Navbar.js';
import UserCard from './components/UserCard.js';
import Search from './components/Search.js';
import ItemDetails from './components/ItemDetails.js';
import ItemCard from './components/ItemCard.js';
import AccountCreation from './components/AccountCreation.js';
import Footer from './components/Footer.js';

let renderAllItems = () => {
  // This function will render <Item/> components for each Item in item array
};

let renderItemCard = () => {
  // This function will render an <Item/> card component when a user
  // click on a specific item to View
};

let renderNavBar = () => {
  // This function is responsible for rendering the navbar at top
  // of screen
};
let renderFooter = () => {
  // this function renders footer at all times (almost all times?)
};


let renderLogin = () => {
  // This is the first function that renders when a user lands
  // other than the top anchored navbar
  // on page. Will render <Login/> Component
};

let renderRegisterUser = () => {
  // This function will render the <AccountCreation/> card when a
  // user click the Create Account button on the login page
};


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      register: false,
      items: [],
    };
  };
  updateItems = (items) => {
    let newItems = Object.entries(items).map((el)=>{
      let item = {...el[1]};
      item.itemID = el[0];
      return item;
    });
    this.setState({items: newItems});
  }
  render() {
    return (
      <div className="App mainContainer">
          <NavBar className="navBar"/>
          <Search updateItems={this.updateItems} className='search' />
          <UserCard className="userCard" />
          {this.state.loggedIn?<Login />:null }
          {this.state.register?<AccountCreation />:null }
          <div className="itemContainer">
           {}
          </div>
          <Footer className='footer'/>
        <BrowserRouter>
        <div>
        {/* <Route exact path='/' render={renderAllItems} /> */}
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
