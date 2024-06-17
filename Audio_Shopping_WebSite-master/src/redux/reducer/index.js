import { combineReducers } from 'redux';
import loginAndSigin from './loginAndSigin.js';
import addItemsAndRemove from './addItemsAndRmoveItems.js';

const CombinedReducer = combineReducers({
    authonication:loginAndSigin,
    cart:addItemsAndRemove,
});

export default CombinedReducer;