import React,  {Component} from 'react'
import {connect} from 'react-redux';
import { clearFlash } from '../../actions/flash';
import PropTypes from 'prop-types';
import {CloseAlert} from '../common';
import { ALERT_INFO } from '../../shared/constants'; 

class Flash extends Component{
    
    clearFlash = () => this.props.clearFlash()        

    render(){
        let { message, type, isVisible } = this.props.flash;        
        return isVisible? 
                <div className={`alert ${type}`} role="alert">
                    {message}
                    <CloseAlert onClick={this.clearFlash}/>
                </div> :
                "";
    }
}

const mapStateToProps =({flash}) => ({flash});
const mapDispatchToProps =(dispatch) => ({
    clearFlash : () => dispatch(clearFlash)
})



Flash.defaultProps = { 
    message : "", 
    type: ALERT_INFO, 
    isVisible: false 
}

Flash.propTypes = { 
    message : PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Flash);