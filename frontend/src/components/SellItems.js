/**
* A window to sell items
*/

import React, {Component} from 'react';
import styled from 'styled-components';


const Sell = styled.div`
padding: 2rem;
`;

class SellItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            itemDescription: '',
            itemQuantity: '',
            itemPrice: '',
            response: '',
            class: 'hidden',
        };
    };
    handleSubmit = (event) => {
        event.preventDefault();
        fetch('/addItem', {
            method: 'PUT',
            credentials: 'same-origin',
            body: JSON.stringify({
                itemName: this.state.itemName,
                itemDescription: this.state.itemDescription,
                quantity: this.state.itemQuantity,
                price: this.state.itemPrice,
                sellerId: this.props.userId,
            }),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            this.setState({response: data.reason});
        });
        this.props.toggleSellItem();
        this.props.getAllItems()
        .then(()=>{
            this.props.showAllItems();
        });
    };
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    componentDidMount = () => {
        setTimeout(()=>this.setState({class: 'sellItems slideIn'}), 200);
    }
    uploadPicture = (image) => {
        let filename = image.name;
        let extension = filename.split('.').pop();
        fetch('/pic', {
            method: 'POST',
            credentials: 'same-origin',
            body: {
                image,
                extension,
            },
        })
        .then((res)=>res.text())
        .then((data)=>{
            // if (!data.status) {
            //     alert('Error!');
            //     return new Error('upload');
            // }
            console.log(data);
        });
    }
    render() {
        return <Sell
        className={this.props.showSellItem?
            'sellItems slideIn'
            :
            'hidden sellItems slideIn'
        } >

        <form onSubmit={this.handleSubmit}>

        <label htmlFor="itemName">Item Name</label> <br/>

        <input type="text"
        id='itemName'
        name='itemName'
        value={this.state.itemName}
        onChange={this.handleChange}/> <br/>

        <label htmlFor="itemDescription">Description</label> <br/>

        <input type="text"
        id='itemDescription'
        name='itemDescription'
        value={this.state.itemDescription}
        onChange={this.handleChange}/> <br/>

        <label htmlFor="itemQuantity">Quantity</label> <br/>

        <input type="text"
        id='itemQuantity'
        name='itemQuantity'
        value={this.state.itemQuantity}
        onChange={this.handleChange}/> <br/>

        <label htmlFor="itemPrice">Price</label> <br/>

        <input
        type="text"
        id='itemPrice'
        name='itemPrice'
        value={this.state.itemPrice}
        onChange={this.handleChange}/> <br/>


        <input type="submit" value="Submit"/> <br/>


        </form>
        <input
        type="file"
        className='btn btn-primary'
        id='input'
        onChange={(e)=>this.uploadPicture(e.target.files[0])}
        accept='image'
        /> <br/>

        <div className="response">{this.state.response}</div>
        </Sell>;
    }
}

export default SellItems;
