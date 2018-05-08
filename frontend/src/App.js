import React, {Component} from 'react';
import logo from './logo.svg';
import {Route, BrowserRouter, Link} from 'react-router-dom';
import './App.css';
import {itemsObjToArray} from './utils.js';
import Login from './components/Login.js';
import NavBar from './components/Navbar.js';
import UserCard from './components/UserCard.js';
import Search from './components/Search.js';
import ItemDetails from './components/ItemDetails.js';
import ItemCard from './components/ItemCard.js';
import AccountCreation from './components/AccountCreation.js';
import Footer from './components/Footer.js';
import SellItems from './components/SellItems.js'

let renderAllItems = (item, index) => {
  // This function will render <ItemCard/> components for each Item
  // in item array
  return <ItemCard item={item} key={'item'+index}/>;
};

let renderItemDetails = (routerData) => {
  // This function will render an <ItemDetails/> card component when a user
  // click on a specific item to Viewitem, id)
  console.log(routerData.match.params.itemId)
  return <ItemDetails item={{}} id={routerData.match.params.id}/>
};



class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      register: false,
      showLogIn: false,
      items: [],
    };
  };
  componentWillMount = () => {
    let items;
    fetch('/allItems')
    .then((res)=>res.json())
    .then((data)=>{
      items = data.content;
      items = itemsObjToArray(items);
      this.setState({items});
    });
  };
  updateUserInfo = (newUserInfo) => {
    console.log(newUserInfo);
    this.setState({loggedIn: true, userId: newUserInfo.userId});
  }
  updateItems = (items) => {
    this.setState({items: itemsObjToArray(items)});
  };
  render() {
    return (
      <div>
          <BrowserRouter>
      <div className="App mainContainer">
          <NavBar className="navBar"/>
          <Search updateItems={this.updateItems} className='search' />
          <UserCard className="userCard" userId={this.state.userId} />
          {this.state.loggedIn?null:<Login updateUserInfo={this.updateUserInfo}/> }
          {this.state.register?<AccountCreation />:null }
          <div className="itemContainer">
           {this.state.items.map(renderAllItems)}
          </div>
          <Footer className='footer'/>
        <div>
          <Route exact={true} path='/item/:id' render={renderItemDetails} />
        {/* <Route exact path='/' render={renderAllItems} /> */}
        </div>
      </div>
        </BrowserRouter>
        </div>
    );
  }
}

export default App;
