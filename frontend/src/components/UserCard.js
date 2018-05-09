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
        if (props.userId) this.getUser(props.userId);
        else this.setState({userId: ''});
    }
    getUser = (userId) => {
        fetch('/user', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({userId}),
        })
        .then((res)=>res.json())
        .then((data)=>{
            this.setState({...data});
        });
    }
    componentWillMount = () => {
        this.setState({userId: null, username: null, description: null});
    }
    render() {
        return (
            <div className="userCard" style={{'display': this.props.show?'block':'none'}}>
                <h3>{this.state.username}</h3>
                <h4>{this.state.description} </h4>
            </div>
        );
    }
}

export default UserCard;
