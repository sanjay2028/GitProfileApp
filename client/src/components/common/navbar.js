import React,  {Component} from 'react'
import { ApiButton } from '../common';

class AppNavBar extends Component{

    constructor(props){
        super(props);
        this.state = {
            username : "",            
            canSubmit : false,
        }
    }

    handleChange = (event) => {
        let username = event.target.value;
        let canSubmit = (!!username.trim())? true : false;         
        this.setState({
            ...this.state, username, canSubmit
        })
    }

    handleSubmit = (event) => {
        let {username} = this.state;
        if(!!username.trim()){
            this.props.handleSubmit(username);            
        }
    }

    render(){        
        let { username, canSubmit } = this.state;
        let {isProcessing} = this.props;
        let disabled = (isProcessing || !canSubmit)? 'disabled' : '';
        return (
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0">Github Username</a>
                    <input className="form-control form-control-dark w-100" type="text" placeholder="Search" onChange={this.handleChange}  />
                    <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <ApiButton title="Search" onClick={this.handleSubmit} isProcessing={isProcessing} isDisabled={disabled} />
                    </li>
                </ul>
            </nav>
            );

    }
}

export default AppNavBar;