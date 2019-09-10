/******************************************************************************
* @Purpose : CHATAPP
* @file : routes.js
* @overview : ChatApp FrontEnd
* @author : BISATI SAI VENKATA VIKAS
* @version : v8.15.0
* @since : 26/09/2019
******************************************************************************/
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
// import {green } from '@material-ui/core/colors';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            openSnackBar: false,
            SnackBarMessage: ""
        }
    }
    snackbarClose = (e) => {
        this.setState({ openSnackBar: false });
    }
    handleChangeMail = (event) => {
        var email = event.target.value;
        this.setState({
            email: email
        })
    }
    handleChangePassword = (event) => {
        var password = event.target.value;
        this.setState({
            password: password
        })
    }
    handleCreateAccout = () => {
        this.props.history.push('/register')
    }
    handleForgotPassword = () => {
        this.props.history.push('/forgotPassword')
    }
    handleSubmit = () => {
        if (this.state.email === "") {
            this.setState({
                openSnackBar: true,
                SnackBarMessage: 'Email Cannot Be Empty'
            })
        }
        else if (this.state.password === "") {
            this.setState({
                openSnackBar: true,
                SnackBarMessage: 'Password Cannot Be Empty'
            })
        }
        else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
            this.setState({
                openSnackBar: true,
                SnackBarMessage: 'Email format is wrong'
            })
        }
        else {

        }
    }
    render() {
        return (
            <div className="signinCss">

                <form >
                    <Card className="card">
                        <h1><span style={{ color: "blue" }}>F</span>
                            <span style={{ color: "red" }}>u</span>
                            <span style={{ color: "green" }}>n</span>
                            <span style={{ color: "green" }}>d</span>
                            <span style={{ color: "orange" }}>o</span>
                            <span style={{ color: "red" }}>o</span></h1>
                        <h1>Sign In</h1>
                        <p>with your Fundoo Account</p>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            // open={true}
                            open={this.state.openSnackBar}
                            autoHideDuration={6000}
                            onClose={this.snackbarClose}
                            message={<span id="messege-id">{this.state.SnackBarMessage}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    arial-label="close"
                                    color="inherit"
                                    onClick={this.snackbarClose}
                                >
                                </IconButton>
                            ]}
                        />
                        <div className="emailField">
                            <TextField
                                required
                                id=""
                                label="Email"
                                type="email"
                                name="Email"
                                margin="normal" 
                                placeholder="Enter your email"
                                variant="outlined"
                                onChange={this.handleChangeMail}
                                value={this.state.email}
                            />
                            <TextField
                                required
                                id=""
                                type="password"
                                label="Password"
                                name="Password"
                                margin="normal"
                                placeholder="Enter your password"
                                variant="outlined"
                                onChange={this.handleChangePassword}
                                value={this.state.password}
                                
                            />
                        </div>
                        <div className="resetLogin">
                            <Button color="primary" id="sensitivity">
                                Reset password
                         </Button>
                        </div>
                        <div className="button">
                            <Button color="primary" id="sensitivity">
                                Create account
                         </Button>
                            {/* </div>
                        <div className="button"> */}
                            <Button variant="contained" color="primary" className="submit" onClick={this.handleSubmit}>
                                Submit
                         </Button>
                        </div>
                    </Card>
                </form>
            </div>
        )
    }
}