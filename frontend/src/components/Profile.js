import React, { Component } from "react";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId
    };
  }
  componentDidMount = () => {
    if (this.props.userId) {
      this.getUser(this.props.userId);
    }
  };
  getUser = userId => {
    console.log(userId);
    fetch("/user", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({ userId })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ ...data });
      });
  };
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