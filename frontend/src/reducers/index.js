import {combineReducers} from 'redux';
import test from './test.js';
import user from './user.js';
import items from './items';
import displayItems from './displayItems';

const allReducers = combineReducers({
    test,
    user,
    items,
    displayItems,
});

export default allReducers;
