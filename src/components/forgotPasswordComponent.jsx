/******************************************************************************
* @Purpose : Fundoo 
* @file : forgotPassword.js
* @overview : Fundoo FrontEnd
* @author : BISATI SAI VENKATA VIKAS
* @version : v8.15.0
* @since : 26/09/2019
******************************************************************************/
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import {userForgotPassword} from '../services/shoppingService'
export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
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
        console.log('data---', email)
    }
    handleSubmit = () => {
        if (this.state.email === "") {
            this.setState({
                openSnackBar: true,
                SnackBarMessage: 'Email Cannot Be Empty'
            })
        }
        else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
            this.setState({
                openSnackBar: true,
                SnackBarMessage: 'Email format is wrong'
            })
        }
        else {
            var forgotDetails = {
                'email': this.state.email
            }
            userForgotPassword(forgotDetails).then((res)=>{
                this.setState({
                    openSnackBar: true,
                    SnackBarMessage: 'Message sent successfully'
                })
            }).catch((err)=>{
                console.log('error',err);
                this.setState({
                    openSnackBar: true,
                    SnackBarMessage: 'Email id is wrong'
                })
            })
        }
    }
    handleBack = () => {
        this.props.props.history.push('/login')
    }
    render() {
        return (
            <div className="forgot-container">
                <form className="forgot-form">
                    <Card className="forgot-card">
                        <h1><span style={{ color: "blue" }}>F</span>
                            <span style={{ color: "red" }}>u</span>
                            <span style={{ color: "green" }}>n</span>
                            <span style={{ color: "green" }}>d</span>
                            <span style={{ color: "orange" }}>o</span>
                            <span style={{ color: "red" }}>o</span></h1>
                        <h3>Sign In</h3>
                        <h1>Find Your Email</h1>
                        <p>Enter your recovery email</p>
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
                        <div className="forgotText">
                            <TextField
                                required
                                id=""
                                label="Email"
                                type="email"
                                name="Email"
                                margin="normal"
                                placeholder="Email"
                                variant="outlined"
                                onChange={this.handleChangeMail}
                                value={this.state.email}
                            />
                        </div>
                        <div className="forgot-buttons">
                            <Button color="primary" varaint="contained" className="text" onClick={this.handleBack}>
                                Back
                         </Button>
                            <Button color="primary" varaint="contained" className="text" onClick={this.handleSubmit}>
                                Submit
                         </Button>
                        </div>
                    </Card>
                </form>
            </div>
        )
    }
}