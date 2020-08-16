import { 
    CLEAR_FLASH,     
    FLASH_SUCCESS, FLASH_ERROR, FLASH_INFO, 
    FLASH_TYPE_ERROR, FLASH_TYPE_SUCCESS, FLASH_TYPE_INFO
} from '../../shared/constants';

const initialState = {    
    message : "",
    type : "",
    isVisible : false    
};

const flash = (state = initialState, {type, payload=null}) => {

    switch(type){
        case FLASH_ERROR:                  
            return {
                ...state, message: payload, type: FLASH_TYPE_ERROR, isVisible: true
            };

        case FLASH_SUCCESS:                        
            return {
                ...state, message: payload, type: FLASH_TYPE_SUCCESS, isVisible: true
            };

        case FLASH_INFO:                        
            return {
                ...state, message: payload, type: FLASH_TYPE_INFO, isVisible: true
            };

        case CLEAR_FLASH:              
            return initialState;
      
        default:            
            return state;
    }

}

export default flash;