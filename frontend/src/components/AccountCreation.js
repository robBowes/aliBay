/**
* A page where unregistered users can create a new user profile
*/

import React, {Component} from 'react';

class AccountCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class: 'hidden',
            username: '',
            password: '',
            classes: ['hidden', 'accountCreation', 'slideIn'],
        };
    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.username, this.state.password);
        fetch('/register', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                credentials: 'same-origin',
            }),
        })
        .then((response)=>response.text())
        .then((response)=>{
            let parsedResponse = JSON.parse(response);
            if (parsedResponse.status === true) {
                // alert(parsedResponse.reason);
                this.props.updateUserInfo(parsedResponse);
            } else {
                // console.log(parsedResponse);
                alert(parsedResponse.reason);
            }
        });
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    componentWillReceiveProps = (props) => {
        let newClasses = props.register?
        'accountCreation slideIn':
        'hidden accountCreation slideIn';
        this.setState({classes: newClasses.split(' ')});
    }
    render() {
        return <div className={this.state.classes.join(' ')}>

        <div
        className="card border-secondary accountCreator" >

        <h2
        className="card-header"
        style={
            {
                display: 'flex',
                justifyContent: 'space-between',
            }
        }
        >
        Register
        <button
        className="btn btn-primary"
        onClick={this.props.toggleCreate}
        >X
        </button>
        </h2>


        <form
        className="card-body"
        onSubmit={this.handleSubmit}>

        <label htmlFor="username1">Username</label> <br />

        <input
        className="form-text text-muted"
        onChange={this.handleChange}
        value={this.state.username}
        type="text"
        name="username"
        id="username1" /><br />

        <label htmlFor="password1">Password</label> <br />

        <input
        onChange={this.handleChange}
        value={this.state.password}
        name="password"
        type="password"
        id="password1" />

        <br />
        <br />

        <input
        className="btn btn-primary"
        type="submit" />

        </form>
        </div>
        </div>;
    }
}

export default AccountCreation;
