export default (state= {
    loggedIn: false,
    show: false,
    register: false,
}
    , action) => {
    let newState = {...state};
    // console.log(action);
    // let newState = state;
    if (action.type === 'LOGIN') {
newState = {
        loggedIn: true,
        show: true,
        register: true,
    };
}
    return newState;
};

// updateUserInfo = (newUserInfo) => {
//     this.setState({loggedIn: true, userId: newUserInfo.userId, show: true, register: false});
//   }
