/**
 * A page where unregistered users can create a new user profile
 */

import React, {Component} from 'react';

class AccountCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: 'hidden',
        };
    }
    handleRegister = (event) => {
        event.preventDefault();
        let username = document.getElementById("username1").value;
        let password = document.getElementById("password1").value;
        console.log(username)
        fetch("/register", {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
            credentials: 'same-origin'
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
        document.getElementById("username1").value = "";
        document.getElementById("password1").value = "";
    }
   
    componentWillMount = () => {
        setTimeout(()=>this.setState({class: 'accountCreation slideIn'}));
    }
    render() {
        return <div className={this.state.class}>
            <div>Register Header<button onClick={this.props.toggleCreate}>close pane</button></div>
            <form onSubmit={this.handleRegister}>
              LOGIN:<br />
              USERNAME<br />
              <input type="text" id="username1" />
              <br />PASSWORD<br />
              <input type="password" id="password1" />
              <br />
              <input type="submit" />
            </form>
          </div>;
    }
}

export default AccountCreation;
