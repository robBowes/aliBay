import {combineReducers} from 'redux';
import test from './test.js';
import user from './user.js';
import items from './items';

const allReducers = combineReducers({
    test,
    user,
    items,
});

export default allReducers;
