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
        newItem.txId = item[0];
        return newItem;
    });
    return newItems;
};
   
  getSoldByTxn = (txn) =>{
     return this.state.items.filter((item)=>{
         console.log(item)
        return item.itemId === txn.toString();
    });
}
    renderSoldByTxn = () => {
        let itemsSold= this.state.txData.map((x,i)=>{
            console.log(x)
            return this.getSoldByTxn(x.itemId)
        })
        console.log(itemsSold)
        return itemsSold[0]
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
        this.setState({ ...data })
        this.getTransactions(this.state.transactions);
      });
  };
  getTransactions = transactions => {
      console.log(transactions)
      fetch('/transactions',{
          method: 'POST',
          credentials: "same-origin",
          body: JSON.stringify({txs: [30000001, 30000001]})
      })
      .then(res=>res.text())
      .then(data=>{
          let newData = JSON.parse(data).content
          this.setState({txData: this.itemsObjToArray(newData)})
            console.log(this.state)
          
      })
  }
  render() {
    let ren = (x, k)=>{
        console.log(x)
        return (<div key={k}>{x.itemName}</div>)
    }
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
            {this.state.txData?this.renderSoldByTxn().map(ren):null}
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