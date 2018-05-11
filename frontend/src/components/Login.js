/**
* An entry point to the app where a user can log in
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameValue: 'bob',
            passwordValue: 'test',
            classLogin: 'hidden',
            classes: ['hidden', 'login', 'slideIn'],
        };
    }
    handleSubmit = (event) => {
        event.preventDefault();
        fetch('/login', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(
                {
                    username: this.state.usernameValue,
                    password: this.state.passwordValue,
                }
            ),
        })
        .then((response) => response.text())
        .then((response) => {
            let parsedResponse = JSON.parse(response);
            if (parsedResponse.status === true) {
                // alert(parsedResponse.reason);
                // this.props.updateUserInfo(parsedResponse);
                this.props.dispatch({type: 'LOGIN'});
                this.props.dispatch({type: 'USER_ID', payload: parsedResponse.userId});
            } else {
                alert(parsedResponse.reason);
            }
        });
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    render() {
        return (<div className={this.props.loggedIn ?
            'hidden login slideIn form-group':
            'login slideIn form-group' }>

        <div
        style={
            {
                maxWidth: '20rem',
                minWidth: '15rem',
                minHeight: '23rem',
            }
        }
        className="card border-secondary">
        <h2 className="card-header">Sign In</h2>
        <form
        className="card-body"
        onSubmit={this.handleSubmit}>

        <p>Already a member? Login to manage your account!</p>

        <label htmlFor="username">Username</label> <br />

        <input
        className="form-text text-muted"
        type="text"
        id="username"
        name="usernameValue"
        onChange={this.handleChange}
        value={this.state.usernameValue} />

        <label htmlFor="password">Password</label> <br/>

        <input
        className="form-password"
        type="password"
        id="password"
        name="passwordValue"
        onChange={this.handleChange}
        value={this.state.passwordValue} />
        <br />

        <input
        className="btn btn-primary smallMargin"
        type="submit" />
        </form>
        </div>

        <div
        style={
            {
                maxWidth: '20rem',
                minWidth: '15rem',
                minHeight: '23rem',
            }
        }
        className="card border-secondary">

        <h2 className="card-header">Register</h2>
        <form
        className="card-body"
        onSubmit={this.props.toggleCreate}>

        <label htmlFor="register">
        Register now to post, edit, and manage ads. It’s quick, easy, and free!
        </label>

        <button
        id="register"
        className="btn btn-primary"
        >
        Create Account
        </button>
        </form>
        </div>
        </div>);
    };
}

const mapStateToProps = (state) => ({
    loggedIn: state.view.loggedIn,
    show: state.view.show,
    register: state.view.register,

});

const connectedLogin = connect(mapStateToProps)(Login);

export default connectedLogin;
