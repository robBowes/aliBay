import React, { Component } from "react";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId
    };
  }
  componentWillReceiveProps = props => {
    if (props.userId) {
      this.getUser(props.userId);
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
      return (
          <div>
              {this.state.userId}
              </div>
      )
  }
}

export default Profile;