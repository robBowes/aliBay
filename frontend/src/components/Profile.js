import React, {Component} from 'react';


class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      userId: this.props.userId,
      items: props.items,
    };
  }
  componentDidMount = () => {
    if (this.props.userId) {
      this.getUser(this.props.userId);
    }
  };
  itemsObjToArray = (items) => {
    if (!items) return;
    let newItems = Object.entries(items).map((item)=>{
        let newItem = {...item[1]};
        newItem.txId = item[0];
        return newItem;
    });
    return newItems;
};

  getSoldByTxn = (txn) =>{
     return this.state.items.filter((item)=>{
        return item.sellerId === txn;
    });
}
    renderSoldByTxn = () => {
        let itemsSold= this.state.txData.map((x, i)=>{
            return this.getSoldByTxn(x.sellerId);
        });
        if (itemsSold[0]) itemsSold[0].reverse();
        return itemsSold[0];
    }

  getBoughtByTxn = (txn)=>{
        if (!this.state.items) return;
        return this.state.items.filter((item)=>{
        return txn.itemId === item.itemId;
  });
}


  renderBoughtByTxn = ()=>{
      let itemsBought = this.state.txData.map((x, i) => {
        if (x.buyerId===this.state.userId) {
        return this.getBoughtByTxn(x)[0];
        }
      }).filter((e)=>!!e);
      return itemsBought;
  }
  getListedById = (id) => {
      return this.state.items.filter((item)=>{
         if (item.quantity>0) {
        return item.sellerId.toString() === this.state.userId;
         }
  });
}
renderListedById = ()=>{
  console.log(this.state.itemsListed);
    let itemsListed = this.state.itemsListed.filter((e)=>!!e).map((x)=>{
        return this.getListedById(x.itemId);
    });
    console.log(this.state);
    itemsListed[0].reverse();
    return itemsListed[0];
}

  getUser = (userId) => {
    fetch('/user', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({userId}),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({...data});
        this.getTransactions(this.state.transactions);
      });
  };
  getTransactions = (transactions) => {
      fetch('/transactions', {
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify({txs: transactions}),
      })
      .then((res)=>res.text())
      .then((data)=>{
          let newData = JSON.parse(data).content;
          this.setState({txData: this.itemsObjToArray(newData)});
      });
  }
  render() {
    let ren = (x, k)=>{
        return <div className="smallItemCard" key={k}>

              <img className="smallCardImage" src={x.filename} />

            <br />
            <div className="smallCardName">{x.itemName}</div>
            <div className="smallCardPrice">{'$' + x.price}</div>
          </div>;
    };
    return <div className="userProfileContainer">
        <div className="profileLeft">
          <img className="profilePicture" src="http://unsplash.it/300/300" />
          <h1 className='usernameH1'>{this.state.username}</h1>
          <h5>{'Description: ' + this.state.description}</h5>
          <h5>Location: </h5>
          <br />
        </div>
        <div className="profileItemsContainer">
          <div className="profileItemHead card-header">ITEMS PURCHASED</div>
          <div className="profileItemsLists">
            {this.state.txData ? this.renderBoughtByTxn().map(ren) : null}
            <br />
          </div>
          <div className="profileItemHead card-header">ITEMS SOLD</div>

          <div className="profileItemsLists">
            {this.state.txData ? this.renderSoldByTxn().map(ren) : null}
            <br />
          </div>
          <div className="profileItemHead card-header">ITEMS FOR SALE</div>

          <div className="profileItemsLists">
            <br />
            {this.state.txData ? this.renderListedById().map(ren) : null}
          </div>
        </div>
      </div>;
  }
}

export default Profile;
