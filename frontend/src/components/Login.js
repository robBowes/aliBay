/**
 * An entry point to the app where a user can log in
 */
import React, {Component} from 'react';

class Login extends Component {
    handleLogin = () => {
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value
        fetch('/login',{
            method: 'POST',
            body: JSON.stringify({username: username, password: password})
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
