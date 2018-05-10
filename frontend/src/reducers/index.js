import {combineReducers} from 'redux';
import test from './test.js';

const allReducers = combineReducers({
    test: test,
});

export default allReducers;
