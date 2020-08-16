import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import socketClient from 'socket.io-client';
import { AppNavBar, AppSidebar, AppBody, AppModal } from '../common';
import {fetchUser, fetchCommitsByRepository, showModal, updateUserRepositories} from '../../actions';

import { SERVER_URL } from '../../shared/constants';

const socket = socketClient(SERVER_URL);

class AppLayout extends Component{

    componentDidMount(){
        socket.on("asyncRepos", data => {
            this.props.updateUserRepositories(data);            
        });       
    }
    

    constructor(props){
        super(props)        
    }

    showModal = (e) => {
        const repoId = e.target.id;
        this.props.showModal();

        this.props.fetchCommits({username : this.props.user.user.login, repoId });
    }

    handleSubmit = (payload) => {
        this.props.fetchUser(payload)
    }

    render(props){        
        let { isProcessing, inTransit=false, user, error, success } = this.props.user;
        let repositories =  !!user && typeof user.repositories !== 'undefined' ? user.repositories : []
        return (
            <Fragment>
                <AppNavBar isProcessing={isProcessing} handleSubmit={this.handleSubmit} />
                <AppSidebar user={user} />
                <AppBody 
                    inTransit={inTransit}
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
    showModal : () => dispatch(showModal),
    updateUserRepositories : (payload) => dispatch(updateUserRepositories(payload))
})


export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);