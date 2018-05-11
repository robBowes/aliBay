import {combineReducers} from 'redux';
import view from './view.js';
import user from './user.js';
import items from './items';
import displayItems from './displayItems';

const allReducers = combineReducers({
    view,
    user,
    items,
    displayItems,
});

export default allReducers;
