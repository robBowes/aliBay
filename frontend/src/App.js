import React, {Component} from 'react';
import logo from './logo.svg';
import {Route, BrowserRouter, Link} from 'react-router-dom';
import './App.css';

class App extends Component {
  helloWorld = () => {
    fetch('/helloWorld').then((res)=>res.json()).then((data)=>console.log(data))
  }
  render() {
    return (
      <div className="App">
        <div>
        </div>
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
