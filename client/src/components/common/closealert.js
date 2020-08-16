import React from 'react';
import PropTypes from 'prop-types';

const CloseAlert = ({onClick}) => {
    return(
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onClick}>
          <span aria-hidden="true">&times;</span>
      </button>
    )  
  }

CloseAlert.propTypes = {
    onClick : PropTypes.func.isRequired
}

export default CloseAlert;