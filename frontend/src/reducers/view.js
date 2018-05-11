export default (state= {
    loggedIn: false,
    show: false,
    register: false,
}
, action) => {
    let newState = {...state};
    if (action.type === 'LOGIN') {
        newState = {
            loggedIn: true,
            show: true,
            register: true,
        };
    } else if (action.type === 'LOGOUT') {
        newState = {
            loggedIn: false,
            register: false,
            showLogIn: false,
            showSellItem: false,
            userId: undefined,
            show: false,
        };
    }
    return newState;
};

