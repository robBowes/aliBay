export default (state = {
    userId: '',
}
, action) => {
    let newState = {...state};
    if (action.type === 'USER_ID') newState.userId = action.payload;
    return newState;
};


