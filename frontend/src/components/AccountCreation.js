/**
 * A page where unregistered users can create a new user profile
 */

import React, {Component} from 'react';

class AccountCreation extends Component {
    handleRegister = (event) => {
        event.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        fetch("/register", {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        .then(response=>response.text())
        .then(response=>{
            let parsedResponse = JSON.parse(response)
            if (parsedResponse.status === true){
                alert(parsedResponse.reason)
            }
            else {
                alert(parsedResponse.reason)
            }
        })
        ;
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
    render() {
        return <div className="accountCreation">
            <div>Register Header</div>
            <form onSubmit={this.handleRegister}>
              LOGIN:<br />
              USERNAME<br />
              <input type="text" id="username" />
              <br />PASSWORD<br />
              <input type="password" id="password" />
              <br />
              <input type="submit" />
            </form>
          </div>;
    }
}

export default AccountCreation;
