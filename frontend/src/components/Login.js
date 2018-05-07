/**
 * An entry point to the app where a user can log in
 */
import React, {Component} from 'react';

class Login extends Component {
    handleLogin = (event) => {
        event.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        fetch('/login', {
            method: 'POST',
            body: JSON.stringify({username: username, password: password})
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
        document.getElementById("username").value = ''
        document.getElementById("password").value = ''
    }
    render() {
        return (
            <div>
                <div>LOG IN HEADER</div>
                    <form onSubmit={this.handleLogin}>
                    LOGIN:<br/>
                    USERNAME<br/>
                    <input type='text' id='username'/>
                    <br/>PASSWORD<br/>
                    <input type='password' id='password'/>
                    <br/>
                    <input type='submit'/>
                    </form>
            </div>
        );
    }
}

export default Login;
