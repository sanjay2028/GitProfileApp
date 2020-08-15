import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { AppNavBar, AppSidebar, AppBody, AppModal } from '../common';
import {fetchUser, fetchCommitsByRepository, showModal} from '../../actions';

class AppLayout extends Component{

    constructor(props){
        super(props)
        
    }

    showModal = (e) => {
        const repoId = e.target.id;
        this.props.showModal();

        this.props.fetchCommits({username : this.props.user.user.login, repoId });
    }

    render(props){
        let { isProcessing, user, error, success } = this.props.user;
        let repositories =  !!user && typeof user.repositories !== 'undefined' ? user.repositories : []
        return (
            <Fragment>
                <AppNavBar isProcessing={isProcessing} handleSubmit={this.props.fetchUser} />
                <AppSidebar user={user} />
                <AppBody 
                    repositories={repositories} 
                    fetchCommits={this.props.fetchCommits} 
                    onShowModal={this.showModal}
                />                   
            </Fragment>        
        );
    }

}

const mapStateToProps = (state) => ({
    user : state.user
})

const mapDispatchToProps = (dispatch) => ({
    fetchUser : (payload) => dispatch(fetchUser(payload)),
    fetchCommits : (payload) => dispatch(fetchCommitsByRepository(payload)),
    showModal : () => dispatch(showModal)
})


export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);