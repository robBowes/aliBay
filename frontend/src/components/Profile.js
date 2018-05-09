import React, { Component } from "react";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      items: this.props.items,
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
  getListedById = (id) => {
      return this.state.items.filter((item)=>{
         console.log(item)
        return item.sellerId.toString() === this.state.userId;

  })
}
renderListedById = ()=>{
    let itemsListed = this.state.itemsListed.map((x)=>{
        return this.getListedById(x.itemId)
    })
    return itemsListed[0]
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
        return <div key={k}>
            <img src="http://unsplash.it/200/200"/>
            <br />
            {x.itemName}
            {'$'+x.price}
          </div>;
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
            <div className="profileItemHead">ITEMS PURCHASED</div>
          <div className="profileItemsLists">
        
            {this.state.transactions + ""}
            <br />
          </div>
          <div className="profileItemHead">ITEMS SOLD</div>
          
          <div className="profileItemsLists">
            {this.state.txData ? this.renderSoldByTxn().map(ren) : null}
            <br />
          </div>
          <div className="profileItemHead">ITEMS FOR SALE</div>
          
          <div className="profileItemsLists">
            <br />
            {this.state.txData ? this.renderListedById().map(ren) : null}
          </div>
        </div>
      </div>;
  }
}

export default Profile;