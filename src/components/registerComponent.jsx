import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import '../App.css'
import ServiceCard from './serviceCardComponent';
import { withRouter } from 'react-router-dom';
import { userRegister } from '../services/shoppingService'
class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            openSnackBar: false
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
    handleChangeConfirmPassword = (event) => {
        var confirmPassword = event.target.value;
        this.setState({
            confirmPassword: confirmPassword
        })
    }
    handleChangeFirstName = (event) => {
        var firstName = event.target.value;
        this.setState({
            firstName: firstName
        })
    }
    handleChangeLastName = (event) => {
        var lastName = event.target.value;
        this.setState({
            lastName: lastName
        })
    }
    handleCart = () => {
        this.props.history.push('/serviceCard');
    }
    handleSubmit = () => {
        if (this.state.firstName === "") {
            this.setState({
                openSnackBar: true,
                SnackBarMessage: 'First Name Cannot Be Empty'
            })
        }
        else if (this.state.lastName === "") {
            this.setState({
                openSnackBar: true,
                SnackBarMessage: 'Last Name Cannot Be Empty'
            })
        }
        else if (this.state.email === "") {
            this.setState({
                openSnackBar: true,
                SnackBarMessage: 'Email Cannot Be Empty'
            })
        }
        else if (this.state.password === "") {
            this.setState({
                openSnackBar: true,
                SnackBarMessage: 'Password Name Cannot Be Empty'
            })
        }
        else {
            var regDetails = {
                'firstName': this.state.firstName,
                'lastName': this.state.lastName,
                'service': this.props.location.state.cartName,
                'email': this.state.email,
                'password': this.state.password,
                'cartId': this.props.location.state.idCart
            }
            console.log("registration details=>", regDetails);
            userRegister(regDetails).then((res) => {
                console.log('res from backend', res)
                this.setState({
                    openSnackBar: true,
                    SnackBarMessage: 'Registration Successfull'
                })
                this.props.history.push('/login')
            }).catch((err) => {
                console.log('errr', err);
            })
        }
    }
    handlelogin = (changeColor, cartIdd, cart, status) => {
        var loginData = {
            changeColor: changeColor,
            cartIdd: cartIdd,
            cart: cart,
            status: status
        }
        this.props.history.push('/login', loginData);
    }
    render() {
        var changeColor = "", cartIdd = "", cart = "", status = "";
        if (this.props.location.state !== 'undefined') {
            changeColor = "orange"
            cartIdd = this.props.location.state.pIdCart
            // cart = this.props.location.state.idCart
            status = "Selected"
        }
        console.log(this.props.location.state)
        return (
            <div className="register-container">
                <Card className="register-card">
                    <div className="register-heading">
                        <h1 style={{ textAlign: "center" }}><span style={{ color: "blue" }}>F</span>
                            <span style={{ color: "red" }}>u</span>
                            <span style={{ color: "green" }}>n</span>
                            <span style={{ color: "green" }}>d</span>
                            <span style={{ color: "orange" }}>o</span>
                            <span style={{ color: "red" }}>o</span></h1>
                        <Button color="primary" id="sensitivity" onClick={this.handleCart}>
                            go to cart
                            </Button>
                        <h2> Create your Fundoo Account</h2>
                    </div>
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
                    <div className="register-fields1">
                        <TextField
                            required
                            label="FirstName"
                            variant="outlined"
                            placeholder="FirstName"
                            type="text"
                            id=""
                            onChange={this.handleChangeFirstName}
                            value={this.state.firstName}
                        />
                        <TextField
                            required
                            label="LastName"
                            variant="outlined"
                            placeholder="LastName"
                            id=""
                            onChange={this.handleChangeLastName}
                            value={this.state.lastName}
                        />
                    </div>
                    <div className="register-fields2">
                        <TextField
                            required
                            label="Email"
                            variant="outlined"
                            placeholder="Email"
                            id=""
                            onChange={this.handleChangeMail}
                            value={this.state.email}
                        />
                    </div>
                    <div className="register-fields1">
                        <TextField
                            required
                            id=""
                            label="Password"
                            variant="outlined"
                            placeholder="Password"
                            type="password"
                            onChange={this.handleChangePassword}
                            value={this.state.password}
                        />
                        <TextField
                            required
                            id=""
                            label="confirm password"
                            variant="outlined"
                            placeholder="confirm password"
                            type="password"
                            onChange={this.handleChangeConfirmPassword}
                            value={this.state.confirmPassword}
                        />
                    </div>
                    <div>
                        <ServiceCard cartProps={true} 
                        cartIdd={cartIdd}
                        status={status}
                        changeColor={changeColor}
                         />
                    </div>
                    <div className="button">
                        <Button variant="contained" color="primary" id="regbutton" onClick={this.handleSubmit}>
                            signup
                        </Button>
                        <Button variant="contained" color="primary" id="regbutton" onClick={() => this.handleSubmit(changeColor, cartIdd, cart, status)}>
                            sign in instead
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }
}
export default withRouter(RegisterComponent);