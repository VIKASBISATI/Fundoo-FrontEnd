import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import { userLogin } from '../services/shoppingService'
import ServiceCard from './serviceCardComponent';
import { withRouter } from 'react-router-dom'
// import { ServiceComponent } from '../components/serviceCardComponent'
import ClearIcon from '@material-ui/icons/Clear';
//class Login extends React.Component or we can use React.createClass
class Login extends React.Component {
    //states are just like the variables and props are shorthand for properties that are passed to the constructor
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            openSnackBar: false,
            SnackBarMessage: "",
        }
    }
    //snackbar is used for displaying the error messages 
    snackbarClose = (e) => {
        this.setState({ openSnackBar: false });
    }
    handleChangeMail = (event) => {
        const Email = event.target.value;
        this.setState({
            email: Email
        })
    }
    handleChangePassword = (event) => {
        const Password = event.target.value;
        this.setState({
            password: Password
        })
    }
    handleCreateAccout = () => {
        this.props.props.history.push('/serviceCard');
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
        else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
            this.setState({
                openSnackBar: true,
                SnackBarMessage: 'Email format is wrong'
            })
        }
        else if (this.state.password === "") {
            this.setState({
                openSnackBar: true,
                SnackBarMessage: 'Email cannot be empty'
            })
        }
        // else if (this.state.) {
        //     this.setState({
        //         openSnackBar: true,
        //         SnackBarMessage: 'Enter correct password'
        //     })
        // }
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
                console.log('res in login', res)
                localStorage.setItem('token', res.data.id);
                localStorage.setItem('FirstName', res.data.firstName);
                localStorage.setItem('userId', res.data.userId);
                localStorage.setItem('LastName', res.data.lastName);
                localStorage.setItem('Email', res.data.email);
                this.props.history.push('/dashboard');
            }).catch((err) => {
                console.log(err);
                
                this.setState({
                    openSnackBar: true,
                    SnackBarMessage: 'Email or password incorrect'
                })
                console.log('login error', err);
            })
        }
    }

    handleEnter = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSubmit(event);
        }
    }
    render() {
        console.log('props in login', this.props);
        var changeColor = "", cartIdd = "", status = "";
        console.log(this.props.location.state !== undefined)
        if (this.props.location.state !== undefined) {
            changeColor = "orange"
            cartIdd = this.props.location.state.cartIdd
            status = "selected"
        }
        return (
            <div className="login-container">
                <Card className="login-card1">
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
                                <ClearIcon />
                            </IconButton>
                        ]}
                    />
                    <div>
                        <TextField
                            required
                            id="email"
                            label={"Email"}
                            type="email"
                            name="Email"
                            margin="normal"
                            placeholder="Email"
                            variant="outlined"
                            onChange={this.handleChangeMail}
                            value={this.state.email}
                            onKeyPress={this.handleEnter}
                        />
                    </div>
                    <div>
                        <TextField type="password"
                            required
                            id="password"
                            label="Password"
                            name="Password"
                            margin="normal"
                            placeholder="Password"
                            variant="outlined"
                            onChange={this.handleChangePassword}
                            value={this.state.password}
                            onKeyPress={this.handleEnter}
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
                {(this.props.location.state !== undefined) ?
                    <Card style={{ backgroundColor: "grey" }} className="login-card2">
                        <p style={{ textAlign: "center" }}>Service</p>
                        <ServiceCard
                            cartProps={true}
                            cartIdd={cartIdd}
                            status={status}
                            changeColor={changeColor}
                        />
                    </Card> : (null)
                }
            </div>
        )
    }
}
export default withRouter(Login);