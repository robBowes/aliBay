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

let renderAllItems = (item, index) => {
  // This function will render <ItemCard/> components for each Item
  // in item array
  return <ItemCard item={item} key={'item'+index}/>;
};



class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      register: false,
      showLogIn: false,
      showSellItem: false,
      items: [],
    };
  };
  componentWillMount = () => {
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
  };
  renderItemDetails = (routerData) => {
  return <ItemDetails items={this.state.items} id={routerData.match.params.id} getItemById={getItemById}/>
  };
  updateUserInfo = (newUserInfo) => {
    console.log(newUserInfo);
    this.setState({loggedIn: true, userId: newUserInfo.userId});
  }
  updateItems = (items) => {
    this.setState({items: itemsObjToArray(items)});
  };
  toggleSellItem = () => {
    this.setState({showSellItem: !this.state.showSellItem});
  }
  toggleCreate = () => {
    this.setState({register: !this.state.register})
  }
  render() {
    return <div>
        <BrowserRouter>
          <div className="App mainContainer">
            <NavBar className="navBar" toggleSellItem={this.toggleSellItem} />
            <Search updateItems={this.updateItems} className="search" />
            <UserCard className="userCard" userId={this.state.userId} />
            {this.state.loggedIn ? null : <Login updateUserInfo={this.updateUserInfo} toggleCreate={this.toggleCreate} loggedIn={this.state.loggedIn} />}
            {this.state.register ? <AccountCreation toggleCreate={this.toggleCreate} /> : null}
            <div className="itemContainer">
              {this.state.items.map(renderAllItems)}
            </div>
            {this.state.showSellItem ? <SellItems toggleSellItem={this.toggleSellItem} userId={this.state.userId} /> : null}
            <Footer className="footer" />
            <Route exact={true} path="/item/:id" render={this.renderItemDetails} />
            {/* <Route exact path='/' render={renderAllItems} /> */}
            <div />
          </div>
        </BrowserRouter>
      </div>;
  }
}

export default App;
