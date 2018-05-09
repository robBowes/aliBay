import React, { Component } from "react";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      items: this.props.items
    };
  }
  componentDidMount = () => {
    if (this.props.userId) {
      this.getUser(this.props.userId);
    }
  };
  itemsObjToArray = (items) => {
    let newItems = Object.entries(items).map((item)=>{
        let newItem = {...item[1]};
        newItem.itemId = item[0];
        return newItem;
    });
    return newItems;
};
  getSoldByTxn = (transactions, txn) =>{

  }
  getBoughtByTxn = (transactions, txn)=>{

  }
  getListedByTxn = () => {

  }
  getUser = userId => {
    fetch("/user", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({ userId })
    })
      .then(res => res.json())
      .then(data => {
        let newData = this.itemsObjToArray(data)
        console.log(newData)
        ;
      });
  };
  getTransactions = transactions => {
      fetch('/',{
          method: 'POST',
          credentials: "same-origin",
          body: JSON.stringify({txs: transactions})
      })
      .then(res=>res.json())
      .then(data=>{
          
      })
  }
  render() {
    return <div className="userProfileContainer">
        <div className="profileLeft">
          <img src="http://unsplash.it/300/300" />
          <h1>{"Name: " + this.state.username}</h1>
          <h5>{"Description: " + this.state.description}</h5>
          <h5>Location: </h5>
          <br />
        </div>
        <div className="profileItemsContainer">
          <div className="profileItemsLists">
            ITEMS PURCHASED<br />
            {this.state.transactions + ""}
            <br />
          </div>
          <div className="profileItemsLists">
            ITEMS SOLD<br />
            {this.state.transactions + ""}
            <br />
          </div>
          <div className="profileItemsLists">
            ITEMS FOR SALE
            <br />
            {this.state.itemsListed + ""}
          </div>
        </div>
      </div>;
  }
}

export default Profile;