import React, { Component } from "react";
import LoginComponent from "../components/loginComponent";
export default class Login extends Component{
    render(){
        return (
              <LoginComponent props={this.props}/>
        );
    }
}
