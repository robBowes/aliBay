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
import Profile from './components/Profile.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      register: false,
      showLogIn: false,
      showSellItem: false,
      items: [],
      showItems: [],
      clearCard: false,
      show: false,
    };
  };
  componentWillMount = () => {
    this.getAllItems()
    .then(()=>{
      this.showAllItems();
      this.setState({loggedIn: false});
    });
  };
  showAllItems = () => {
    this.setState({showItems: this.state.items});
  }
  getAllItems = () => {
    let items;
    return fetch('/allItems', {
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
  changeShownItems = (items) => {
    this.setState({showItems: itemsObjToArray(items)});
  };
  toggleSellItem = () => {
    this.setState({showSellItem: !this.state.showSellItem});
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
  renderProfile = () =>{
    if (this.state.loggedIn) {
      return <Profile userId={this.state.userId}/>;
    } else {
      <Link to={'/'}/>;
    }
  }
  render() {
    return (
      <div>
      <BrowserRouter>
      <div className="App mainContainer">
      <Route exact={true} path='/profile/' render={this.renderProfile}/>

      <NavBar
      className="navBar"
      toggleSellItem={this.toggleSellItem}
      handleLogout={this.handleLogout}
      loggedIn={this.state.loggedIn}
      />

      <div className='blurFrame' style={{'background-color': !this.state.loggedIn || this.state.showSellItem?'rgba(0, 0, 0, 0.514':'rgba(0, 0, 0, 0'}}/>
      <Search
      changeShownItems={this.changeShownItems}
      allItems={this.state.items}
      className='search' />

      <UserCard
      className="userCard"
      userId={this.state.userId}
      show={this.state.show}/>

      <Login
      updateUserInfo={this.updateUserInfo}
      toggleCreate={this.toggleCreate}
      loggedIn={this.state.loggedIn}/>

      <AccountCreation
      toggleCreate={this.toggleCreate}
      register={this.state.register}
      />

      <ItemContainer items={this.state.showItems}/>

      {
        this.state.showSellItem?
        <SellItems
        toggleSellItem={this.toggleSellItem}
        userId={this.state.userId}
        getAllItems={this.getAllItems}
        showAllItems={this.showAllItems}
        />:
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
