import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import '../App.css'
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
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
    handleLogin = () => {
        this.props.history.push('/serviceCard')
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

        }
    }
    render() {
        return (
            <div className="register-container">
                <form>
                    <Card className="register-card">
                        
                        <div className="register-heading">
                            <h1 style={{ textAlign: "center" }}><span style={{ color: "blue" }}>F</span>
                                <span style={{ color: "red" }}>u</span>
                                <span style={{ color: "green" }}>n</span>
                                <span style={{ color: "green" }}>d</span>
                                <span style={{ color: "orange" }}>o</span>
                                <span style={{ color: "red" }}>o</span></h1>
                            <Button color="primary" id="sensitivity" onClick={this.handleLogin}>
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
                                placeholder="FirstName"
                                type="text"
                                id=""
                                onChange={this.handleChangeFirstName}
                                value={this.state.firstName}
                            />
                            <TextField
                                required
                                label="LastName"
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
                                placeholder="Password"
                                type="password"
                                onChange={this.handleChangePassword}
                                value={this.state.password}
                            />
                            <TextField
                                required
                                id=""
                                label="confirm password"
                                placeholder="confirm password"
                                type="password"
                                onChange={this.handleChangePassword}
                                value={this.state.password}
                            />

                        </div>
                        <div className="button">
                            <Button variant="contained" color="primary" id="regbutton" onClick={this.handleLogin}>
                                signup
                            </Button>
                        </div>
                    </Card>
                </form>
            </div >
        )
    }
}