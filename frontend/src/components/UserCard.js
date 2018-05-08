/**
* A card to display next to results which holds some basic user information
*/

import React, {Component} from 'react';

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
        };
    }
    componentWillReceiveProps = (props) => {
        if (props.userId) this.getUser();
    }
    getUser = () => {
        fetch('/user', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({userId: this.state.userId}),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            this.setState({...data});
        });
    }
    render() {
        return (
            <div className="userCard">
                <h3>{this.state.username}</h3>
                <h4>{this.state.description} </h4>
            </div>
        );
    }
}

export default UserCard;
