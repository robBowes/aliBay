export default (state = {
    userId: '',
    cart: []
}
, action) => {
    let newState = {...state};
    if (action.type === 'USER_ID') {newState.userId = action.payload}
    else if (action.type === 'UPDATE_CART'){
            newState.cart = action.payload
        }
    return newState;
};


