import React, {Component} from 'react';
import logo from './logo.svg';
import {Route, BrowserRouter, Link} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">



        <BrowserRouter>
        <div>
        <Route exact path='/' render={renderAllItems} />
        </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
