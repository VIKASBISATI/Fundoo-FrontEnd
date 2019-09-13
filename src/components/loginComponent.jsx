import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import { userLogin } from '../services/shoppingService'
//class Login extends React.Component or we can use React.createClass
export default class Login extends React.Component {
    //states are just like the variables and props are shorthand for properties that are passed to the constructor
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            openSnackBar: false,
            SnackBarMessage: ""
        }
    }
    //snackbar is used for displaying the error messages 
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
        this.props.props.history.push('/register');
    }
    handleForgotPassword = () => {
        this.props.props.history.push('/forgotPassword')
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
            // console.log('first');
            var loginDetails = {
                'email': this.state.email,
                'password': this.state.password
            }
            userLogin(loginDetails).then((res) => {
                this.setState({
                    openSnackBar: true,
                    SnackBarMessage: 'Login Success'
                })

            }).catch((err) => {
                this.setState({
                    openSnackBar: true,
                    SnackBarMessage: 'Login Failure'
                })
                console.log('login error', err);
            })
        }
    }
    render() {
        return (
            <div className="login-container">
                <form className="login-form">
                    <Card className="login-card">
                        <h1><span style={{ color: "blue" }}>F</span>
                            <span style={{ color: "red" }}>u</span>
                            <span style={{ color: "green" }}>n</span>
                            <span style={{ color: "green" }}>d</span>
                            <span style={{ color: "orange" }}>o</span>
                            <span style={{ color: "red" }}>o</span></h1>
                        <h3>Sign In</h3>
                        <p><b>continue to Your Email</b></p>
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
                        <div>
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
                        <div>
                            <TextField type="password"
                                required
                                id=""
                                label="Password"
                                name="Password"
                                margin="normal"
                                placeholder="Password"
                                variant="outlined"
                                onChange={this.handleChangePassword}
                                value={this.state.password}
                            />
                        </div>
                        <div className="login-button1">
                            <Button variant="contained" color="primary" className="text" onClick={this.handleSubmit}>
                                Login
                         </Button>
                        </div>
                        <div className="login-button2">
                            <Button color="secondary" id="sensitivity" onClick={this.handleForgotPassword}>
                                ForgotPassword?
                         </Button>
                            <Button color="primary" id="sensitivity" onClick={this.handleCreateAccout}>
                                CreatAccount
                         </Button>
                        </div>
                    </Card>
                </form>
            </div>
        )
    }
}