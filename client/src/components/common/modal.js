import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../../actions';

class AppModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            isVisible : false,
            commits : []
        }
    }

    onClose = () => {        
        this.props.hideModal();
    }

    render(){

        let { isVisible, commits } = this.props;

        let output = ""

        if(commits.commits.constructor.name == 'Array'){            
            output = commits.commits.map(item => {
                return <li key={item._id}>{item.message} on {item.date}</li>
            })            
        } else {
            output = <li>${commits}</li>
        }


        return(            
            <div className={`modal { isVisible && 'fade show'}`} tabIndex="-1" role="dialog" style={{display: isVisible? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                                <button onClick={this.onClose} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <div className="modal-body">
                            <ul>{output}</ul>
                        </div>
                        <div className="modal-footer">                            
                            <button onClick={this.onClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

const mapStateToProps = ({commits}) => ({
    isVisible : commits.modal_visible,
    commits
})

const mapDispatchToProps = (dispatch) => ({
    hideModal : () => dispatch(hideModal)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppModal);