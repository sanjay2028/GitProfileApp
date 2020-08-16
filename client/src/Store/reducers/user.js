import { FETCH_USER_START, FETCH_USER_SUCCESS, FETCH_USER_FAILED, FETCH_USER_END, UPDATE_USER_REPOSITORIES } from '../../shared/constants';

const initialState = {
    isProcessing : false,
    error : null,
    success : null,
    user : null,
};

const user = (state = initialState, {type, payload=null}) => {
    switch(type){
        case FETCH_USER_START:                           
            return {
                ...state, success:null, error:"", isProcessing : true,
            };

        case FETCH_USER_END:            
            return {
                ...state, isProcessing: false
            };

        case FETCH_USER_SUCCESS:              
            return {
                ...state, success : true, error:null, user: payload
            };

        case FETCH_USER_FAILED:
            return {
                ...state, success : false, error: payload, user: null
            };  
        
        case UPDATE_USER_REPOSITORIES:
            let newUser = state.user;
            newUser.repositories = payload
            return {
                ...state, user: newUser
            };  
            
        default:            
            return state;
    }

}

export default user;