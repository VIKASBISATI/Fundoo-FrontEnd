import React, { Component } from "react";
import LoginComponent from "../components/loginComponent";
export default class Login extends Component{
    render(){
        console.log("this.porp.s in login page",this.props);
        
        return (
              <LoginComponent props={this.props}/>
        );
    }
}
