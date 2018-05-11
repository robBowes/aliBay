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
import Cart from './components/Cart.js';
import {connect} from 'react-redux';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      register: false,
      showLogIn: false,
      showSellItem: false,
      showItemDet: false,
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
    return fetch('/allItems', {
      credentials: 'same-origin',
    })
    .then((res)=>res.json())
    .then((data)=>{
      let items =itemsObjToArray(data.content);
      // this.setState({items});
      this.props.dispatch({
        type: 'NEW_ITEMS',
        payload: items,
      });
      this.props.dispatch({
        type: 'CHANGE_SHOWN_ITEMS',
        payload: items,
    });
    });
  }
  renderItemDetails = (routerData) => {
    return <ItemDetails
    itemDet={this.state.showItemDet}
    getAllItems={this.getAllItems}
    items={this.props.items}
    id={routerData.match.params.id}
    getItemById={getItemById}
    toggleShowItem={this.toggleShowItem}/>;
  };
  // updateUserInfo = (newUserInfo) => {
  //   this.setState({loggedIn: true, userId: newUserInfo.userId, show: true, register: false});
  // }
  changeShownItems = (items) => {
    this.setState({showItems: itemsObjToArray(items)});
  };
  toggleSellItem = () => {
    this.setState({showSellItem: !this.state.showSellItem});
  }
  toggleShowItem =()=>{
    this.setState({showItemDet: !this.state.showItemDet});
  }
  toggleCreate = (event) => {
    event.preventDefault();
    this.setState({register: !this.state.register});
  }

  renderProfile = (routerData) =>{
    console.log(this.props);
    if (this.props.loggedIn) {
      return <Profile userId={routerData.match.params.userId} items={this.props.items}/>;
    } else {
      <Link to={'/'}/>;
    }
  }
  render() {
    return (
      <div>
      <BrowserRouter>
      <div className="App mainContainer">
      <Route exact={true} path='/profile/user:userId' render={this.renderProfile}/>

      <NavBar
      className="navBar"
      toggleSellItem={this.toggleSellItem}
      handleLogout={this.handleLogout}
      loggedIn={this.props.loggedIn}
      userId={this.props.userId}
      />

      <div
      className='blurFrame'
      style={
        {'backgroundColor': (!this.props.loggedIn || this.state.showSellItem || this.state.showItemDet)?
        'rgba(0, 0, 0, 0.514':'rgba(0, 0, 0, 0'}
      }/>

      <Search
      changeShownItems={this.changeShownItems}
      allItems={this.state.items}
      className='search' />

      <UserCard
      className="userCard"
      userId={this.props.userId}
      show={this.props.show}/>

      <Login
      updateUserInfo={this.updateUserInfo}
      toggleCreate={this.toggleCreate}
      loggedIn={this.props.loggedIn}/>

      <AccountCreation
      toggleCreate={this.toggleCreate}
      register={this.state.register}
      updateUserInfo={this.updateUserInfo}
      />

      <ItemContainer/>


      <SellItems
      toggleSellItem={this.toggleSellItem}
      userId={this.state.userId}
      getAllItems={this.getAllItems}
      showAllItems={this.showAllItems}
      showSellItem={this.state.showSellItem}
      />

      <Cart
      />

      <Footer/>
      <Route exact={true} path='/item/:id' render={this.renderItemDetails} />
      </div>
      </BrowserRouter>
      </div>
    );
  }
}


const mapStateToProps = (state) =>({
  loggedIn: state.view.loggedIn,
  userId: state.user.userId,
  show: state.view.show,
  items: state.items,

});

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
