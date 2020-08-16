import { FETCH_USER_START, FETCH_USER_SUCCESS, FETCH_USER_FAILED, FETCH_USER_END } from '../../shared/constants';

const initialState = {
    isProcessing : null,
    error : null,
    success : null,
    user : null,
};

const user = (state = initialState, {type, payload=null}) => {
    switch(type){
        case FETCH_USER_START:       
            console.log("Fetching starts")                 
            return {
                ...state, success:null, error:"", isProcessing : true,
            };break;            
            

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
        default:            
            return state;
    }

}

export default user;