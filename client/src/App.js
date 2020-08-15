/**
 * Authos: Sanjay Kumar (Sanjay2028@gmail.com)
 * Date: Aug 15, 2020
 * Purpose: Renders the main app component 
 */

import React, { Component } from 'react';
import AppLayout from './components/layout';

class App extends Component{
    constructor(props){
      super(props)
    }

    componentDidMount(){

      console.log("Mouting the app");


    }

    render(){

      return <AppLayout />


    }

}



export default App;
