export default (state = [], action) => {
    let newState = [...state];
    if (action.type === 'NEW_ITEMS') newState=action.payload;
    return newState;
};
