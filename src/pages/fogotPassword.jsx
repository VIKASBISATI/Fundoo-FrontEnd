import React, { Component } from "react";
import Forgot from "../components/forgotPasswordComponent";
export default class ForgotPassword extends Component {
    render() {
        return (
                <Forgot props={this.props}/>
        );
    }
}