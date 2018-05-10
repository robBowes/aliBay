import {combineReducers} from 'redux';
import test from './test.js';

const allReducers = combineReducers({
    login: test,
});

export default allReducers;
