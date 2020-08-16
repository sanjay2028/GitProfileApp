import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_API_BUTTON_TITLE, DEFAULT_API_BUTTON_STYLE } from '../../shared/constants';

const ApiButton = ({title, onClick, isProcessing, isDisabled}) => {   
    title = isProcessing? "Please Wait..." : title; 
    return (        
        <button             
            disabled={isDisabled && "disabled"}
            className={`btn ${DEFAULT_API_BUTTON_STYLE}`} 
            onClick={onClick}
        >{title}
        </button>
    )
}

ApiButton.defaultProps = {
    isProcessing: false,
    isDisabled: false,       
    title: DEFAULT_API_BUTTON_TITLE,       
}

ApiButton.propTypes = {
    isProcessing : PropTypes.bool.isRequired,
    isDisabled : PropTypes.string.isRequired,
    handleSubmit : PropTypes.func
}

export default ApiButton
