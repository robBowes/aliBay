import React, {Component} from 'react';
import logo from './logo.svg';
import {Route, BrowserRouter, Link} from 'react-router-dom';
import './App.css';
import {itemsObjToArray, getItemById} from './utils.js';
import Login from './components/Login.js';
import NavBar from './components/Navbar.js';
import UserCard from './components/UserCard.js';
import Search from './components/Search.js';
import ItemDetails from './components/ItemDetails.js';
import ItemCard from './components/ItemCard.js';
import AccountCreation from './components/AccountCreation.js';
import Footer from './components/Footer.js';
import SellItems from './components/SellItems.js';
import ItemContainer from './components/ItemContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      register: false,
      showLogIn: false,
      showSellItem: false,
      items: [],
      clearCard: false,
      show: false,
    };
  };
  componentWillMount = () => {
    this.getAllItems();
  };
  getAllItems = () => {
    let items;
    fetch('/allItems', {
      credentials: 'same-origin',
    })
    .then((res)=>res.json())
    .then((data)=>{
      items = data.content;
      items = itemsObjToArray(items);
      this.setState({items});
    });
  }
  renderItemDetails = (routerData) => {
    return <ItemDetails
    items={this.state.items}
    id={routerData.match.params.id}
    getItemById={getItemById}/>;
  };
  updateUserInfo = (newUserInfo) => {
    this.setState({loggedIn: true, userId: newUserInfo.userId, show: true});
  }
  updateItems = (items) => {
    this.setState({items: itemsObjToArray(items)});
  };
  toggleSellItem = () => {
    this.setState({showSellItem: !this.state.showSellItem});
    this.getAllItems();
  }
  toggleCreate = () => {
    this.setState({register: !this.state.register});
  }
  handleLogout = () => {
    document.cookie='';
    this.setState({
      loggedIn: false,
      register: false,
      showLogIn: false,
      showSellItem: false,
      userId: undefined,
      show: false,
    });
  }
  render() {
    return (
      <div>
      <BrowserRouter>
      <div className="App mainContainer">

      <NavBar
      className="navBar"
      toggleSellItem={this.toggleSellItem}
      handleLogout={this.handleLogout}
      loggedIn={this.state.loggedIn}
      />

      <Search
      updateItems={this.updateItems}
      className='search' />

      <UserCard
      className="userCard"
      userId={this.state.userId}
      show={this.state.show}/>

      {
        this.state.loggedIn?
        null:
        <Login
        updateUserInfo={this.updateUserInfo}
        toggleCreate={this.toggleCreate}
        loggedIn={this.state.loggedIn}/>
      }

      {
        this.state.register?
        <AccountCreation toggleCreate={this.toggleCreate} />:
        null
      }

      <ItemContainer items={this.state.items}/>
      {
        this.state.showSellItem?
        <SellItems
        toggleSellItem={this.toggleSellItem}
        userId={this.state.userId}/>:
        null
      }

      <Footer/>
      <Route exact={true} path='/item/:id' render={this.renderItemDetails} />
      </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
