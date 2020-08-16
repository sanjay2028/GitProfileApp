import { 
    CLEAR_FLASH, FLASH_SUCCESS, FLASH_ERROR    
 } from '../shared/constants';
 


const clearFlash = { type : CLEAR_FLASH }
const setFlashSuccess = (payload) => ({ type : FLASH_SUCCESS, payload })
const setFlashError = (payload) => ({ type : FLASH_ERROR, payload })
const setFlashInfo = (payload) => ({ type : CLEAR_FLASH, payload })

 export { clearFlash, setFlashSuccess, setFlashError, setFlashInfo }