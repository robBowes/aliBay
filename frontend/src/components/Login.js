/**
* An entry point to the app where a user can log in
*/
import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameValue: 'bob',
            passwordValue: 'test',
            classLogin: 'hidden',
        };
    }
    handleSubmit = (event) => {
        event.preventDefault();
        fetch('/login', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({ username: this.state.usernameValue, password: this.state.passwordValue }),
        })
        .then((response) => response.text())
        .then((response) => {
            console.log(response)
            let parsedResponse = JSON.parse(response);
            if (parsedResponse.status === true) {
                // alert(parsedResponse.reason);
                this.props.updateUserInfo(parsedResponse);
            } else {
                alert(parsedResponse.reason);
            }
        });
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    componentWillMount = () => {
        setTimeout(()=>this.setState({classLogin: 'login slideIn'}), 100)
    }
    render() {
        return (<div className={this.state.classLogin}>
        <div>LOG IN HEADER</div>
        <form onSubmit={this.handleSubmit}>
        LOGIN:<br />
        USERNAME<br />
        <input type="text" id="username" name="usernameValue" onChange={this.handleChange} value={this.state.usernameValue} />
        <br />PASSWORD<br />
        <input type="password" id="password" name="passwordValue" onChange={this.handleChange} value={this.state.passwordValue} />
        <br />
        <input type="submit" />
        </form>
        <button style={{ display: this.props.loggedIn ? "none" : "block" }} onClick={this.props.toggleCreate}>
        Create Account
        </button>
        </div>);
    };
}
export default Login;
