import React, {Component} from 'react';
import logo from './logo.svg';
import {Route, BrowserRouter, Link} from 'react-router-dom';
import NavBar from './components/Navbar.js'
import './App.css';

// renderAllItems = () => {
//   //This function will render <Item/> components for each Item in item array
// }

// renderItemCard = () => {
//   //This function will render an <Item/> card component when a user
//   // click on a specific item to View
// }

// renderNavBar = () => {
//   //This function is responsible for rendering the navbar at top
//   //of screen
// }
// renderFooter = () => {
//   //this function renders footer at all times (almost all times?)
// }



// renderLogin = () => {
//   //This is the first function that renders when a user lands
//   //other than the top anchored navbar
//   //on page. Will render <Login/> Component
// }

// renderRegisterUser = () => {
//   //This function will render the <AccountCreation/> card when a
//   //user click the Create Account button on the login page
// }



class App extends Component {
  helloWorld = () => {
    let ret;
    fetch('/helloWorld')
      .then((res)=>res.text())
      .then((data)=>console.log(ret = data));
    return ret;
  }
  render() {
    return (
      <div className="App mainContainer">
        <div className="navBar" >
          <NavBar/>
        </div>
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
