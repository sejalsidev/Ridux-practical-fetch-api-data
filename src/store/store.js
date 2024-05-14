import { createStore, applyMiddleware, combineReducers } from 'redux';

import reducer from '../reducer/reducers';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    todo: reducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;