import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './reducers/user';
import commits from './reducers/commits';

const rootReducer = combineReducers({
    user : user,    
    commits: commits
    //flashMessage : flashMessageReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;