export default (state=false, action) => {
    // let newState = {...state}
    console.log(action);
    let newState = state;
    if (action.type === 'LOGIN') newState = true;
    return newState;
};
