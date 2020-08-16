import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './reducers/user';
import commits from './reducers/commits';
import flash from './reducers/flash';

const rootReducer = combineReducers({user, commits, flash})
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;