import { SHOW_COMMIT_MODAL, HIDE_COMMIT_MODAL, FETCH_COMMITS_START, FETCH_COMMITS_SUCCESS, FETCH_COMMITS_FAILED, FETCH_COMMITS_END } from '../../shared/constants';

const initialState = {
    modal_visible : false,
    isProcessing : false,
    error : null,
    success : null,
    commits : []    
};

const commits = (state = initialState, {type, payload=null}) => {    
    switch(type){
        case SHOW_COMMIT_MODAL:                        
            return { ...state, modal_visible: true };
        
        case HIDE_COMMIT_MODAL:                        
            return { ...state, modal_visible: false };

        case FETCH_COMMITS_START:                        
            return { ...state, isProcessing: true, success:null, error:null };

        case FETCH_COMMITS_END:
            return {
                ...state, isProcessing: false
            };

        case FETCH_COMMITS_SUCCESS:              
            return {
                ...state, success : true, error:null, commits: payload
            };

        case FETCH_COMMITS_FAILED:
            return {
                ...state, success : false, error: payload, commits: []
            };                
        default:            
            return state;
    }

}

export default commits;