import { 
    FETCH_USER_START, 
    FETCH_USER_SUCCESS, 
    FETCH_USER_FAILED, 
    FETCH_USER_END,
    FETCH_COMMITS_START,
    FETCH_COMMITS_SUCCESS,
    FETCH_COMMITS_FAILED,
    FETCH_COMMITS_END,
    SHOW_COMMIT_MODAL,
    HIDE_COMMIT_MODAL,
    UPDATE_USER_REPOSITORIES
 } from '../shared/constants';

import { clearFlash, setFlashSuccess, setFlashError, setFlashInfo } from './flash';
import userService from '../services';

const fetchUserStart = {
    type : FETCH_USER_START
}

const fetchUserEnds = {
    type : FETCH_USER_END
}

const updateUserRepositories = (payload) => ({
    type : UPDATE_USER_REPOSITORIES, payload
})

const fetchUserSuccess = (payload) => {    
    return {
        type : FETCH_USER_SUCCESS, 
        payload: payload
    }
}

const fetchUserFailed = (payload) => ({
    type : FETCH_USER_FAILED, payload
})

const fetchUser = (payload) => {
    
    return function async (dispatch) {                              
        dispatch(clearFlash);
        dispatch(fetchUserStart);  
        return userService
        .fetchUser(payload)
        .then(({ data }) => {                                    
            dispatch(setFlashSuccess("Success !!!"));
            dispatch(fetchUserSuccess(data));                           
        }).catch(({error, flash}) => {                      
            dispatch(setFlashError(flash));
            dispatch(fetchUserFailed(error))           
        }).finally(() => {            
            dispatch(fetchUserEnds)
        });        
    }
}


/**
 * Modal
 */

const showModal  = { type : SHOW_COMMIT_MODAL }
const hideModal = { type : HIDE_COMMIT_MODAL }


/**  
 * Commits
 */
const fetchCommitStart = {
    type : FETCH_COMMITS_START
}

const fetchCommitEnds = {
    type : FETCH_COMMITS_END
}

const fetchCommitSuccess = (payload) => {    
    return {
        type : FETCH_COMMITS_SUCCESS, 
        payload: payload
    }
}

const fetchCommitFailed = (payload) => ({
    type : FETCH_COMMITS_FAILED, payload
})

const fetchCommitsByRepository = (payload) => {
    
    return function (dispatch) {    
        dispatch(clearFlash);          
        dispatch(fetchCommitStart);  
        return userService
        .fetchCommits(payload)
        .then(({ data }) => {   
            dispatch(fetchCommitSuccess(data));                           
        }).catch((response) => {                        
            return dispatch(fetchCommitFailed(response))           
        }).finally(() => dispatch(fetchCommitEnds));
        
    }
}

export { fetchUser, fetchCommitsByRepository, showModal, hideModal, updateUserRepositories }  