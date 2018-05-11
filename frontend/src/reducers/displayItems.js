export default (state = [], action) => {
    let newState = [...state];
    if (action.type === 'CHANGE_SHOWN_ITEMS') newState = action.payload;
    return newState;
};
