export default (state= {
    loggedIn: false,
    show: false,
    register: false,
    cart: false,
    blur: true,
    showSellItem: false,
}
, action) => {
    let newState = {...state};
    if (action.type === 'LOGIN') {
        newState = {
            loggedIn: true,
            show: true,
            register: false,
        };
    } else if (action.type === 'LOGOUT') {
        newState = {
            loggedIn: false,
            register: false,
            showLogIn: false,
            showSellItem: false,
            show: false,
        };
    } else if (action.type === 'TOGGLE_REGISTER') {
        newState.register = !state.register;
    } else if (action.type === 'TOGGLE_CART') {
        newState.cart = !newState.cart;
    } else if (action.type === 'TOGGLE_SELL_ITEM') {
        newState.showSellItem = !newState.showSellItem;
    } else if (action.type==='DISABLE_CART') {
        newState.cart = false;
    }
    return newState;
};

