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
            filename: '',
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
                imagename: this.state.imagename,
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
        this.setState({
            itemName: '',
            itemDescription: '',
            itemQuantity: '',
            itemPrice: '',
            response: '',
            filename: '',
            response: '',
        });
    };
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    componentDidMount = () => {
        setTimeout(()=>this.setState({class: 'sellItems slideIn'}), 200);
    }
    uploadPicture = (image) => {
        console.log(image);
        let filename = image.name;
        let extension = filename.split('.').pop();
        fetch('/pic?ext='+extension, {
            method: 'POST',
            credentials: 'same-origin',
            body: image,
        })
        .then((res)=>res.json())
        .then((data)=>{
            if (!data.status) {
                alert('Error!');
                return new Error('upload');
            }
            console.log(data);
            this.setState({imagename: data.content});
        })
        .catch((e)=>console.log(e));
    }
    render() {
        return <Sell
        className={this.props.showSellItem?
            'sellItems slideIn'
            :
            'hidden sellItems slideIn'
        } >
        <div className="card border-secondary">
        <h3 className="card-header">Sell Item</h3>

        <form
        className="card-body"
        onSubmit={this.handleSubmit}>

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

        <input
        type="file"
        className='btn btn-primary smallMargin'
        id='input'
        onChange={(e)=>this.uploadPicture(e.target.files[0])}
        accept='image'
        /> <br/>

        <input
        className="btn btn-primary smallMargin"
        type="submit"
        value="Submit"/> <br/>

        </form>

        <div className="response">{this.state.response}</div>
        </div>
        </Sell>;
    }
}

export default SellItems;
