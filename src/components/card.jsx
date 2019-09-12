/******************************************************************************
* @Purpose : FUNDOO
* @file : card.js
* @overview : Fundoo FrontEnd
* @author : BISATI SAI VENKATA VIKAS
* @version : v8.15.0
* @since : 26/09/2019
******************************************************************************/
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, Card, Button } from '@material-ui/core';
import { service } from '../services/userService';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
export default class CardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            serviceData: [],
            openSnackBar: false,
            SnackBarMessage: ""
        }
    }
    handleLogin = () => {
        this.props.history.push('/login')
    }
    handleDialog = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        });
    }
    handleProceed = () => {
        this.props.history.push('/registration')
    }
    componentWillMount() {
        service()
            .then(response => {
                console.log('Response from service', response);
                this.setState({
                    serviceData: response.data.data.data
                })
                console.log(this.state.serviceData)
            })
    }
    render() {
        const ser = this.state.serviceData.map((object, index) => {
            console.log('index is --------', index)
            if (index === 0) {
                return (
                    <div>
                        <p style={{ paddingRight: "50px" }}><b>Price : $ {object.price} per month</b></p>
                        <p><span style={{ color: "blue" }}>{object.name}</span></p>

                        <ul>
                            <li style={{ padding: '-1px' }}>
                                ${object.price}/month
                            </li>
                            <li>
                                {object.description}
                            </li>
                        </ul>
                    </div>
                )
            } else {
                return true;;
            }
        })
        const sers = this.state.serviceData.map((object, index) => {
            if (index === 1) {
                return (
                    <div>
                        <p style={{ paddingRight: "50px" }}><b>Price : $ {object.price} per month</b></p>
                        <p ><span style={{ color: "blue" }}>{object.name}</span></p>
                        <ul>
                            <li>${object.price}/month</li>
                            <li>{object.description}</li>
                        </ul>

                    </div>
                )
            }
            else {
                return true;
            }                                                
        })
        return (
            <div>
                <div >
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6">
                                FundooNotes
                        </Typography>
                        </Toolbar>
                    </AppBar>
                    <div>
                        <p id="cardText"><b>FundooNotes offered. Choose below service to register.</b></p>
                    </div>
                    <div className="cards">
                        <div className="cardDiv1">
                            <Card className="cardsInCard1" onClick={this.handleDialog}>
                                <div >
                                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                        <DialogTitle>Advance Pack Details</DialogTitle>
                                        <DialogActions>

                                            <Button onClick={this.handleClose} color="primary">
                                                Remove
                                                </Button>
                                            <Button onClick={this.handleProceed} color="primary">
                                                Proceed To Checkout
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <h5 style={{ marginLeft: "50px", marginTop: "235px" }}>ADD TO CART</h5>
                                </div>
                            </Card>
                            <Card className="cardsInCard2" onClick={this.handleDialog}>
                                <div>
                                    {ser}
                                </div>
                            </Card>
                        </div>
                        <div className="cardDiv2" >
                            <Card className="cardsInCard1" onClick={this.handleDialog} >
                                <div>
                                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                        <DialogTitle style={{ textAlign: "center" }}>Advance Pack Details</DialogTitle>
                                        <DialogActions>
                                            <Button onClick={this.handleClose} color="primary">
                                                Remove
                                                </Button>
                                            <Button onClick={this.handleProceed} color="primary">
                                                Proceed To Checkout
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <h5 style={{ marginLeft: "50px", marginTop: "235px" }}>ADD TO CART</h5>
                                </div>
                            </Card>
                            <Card className="cardsInCard2" onClick={this.handleDialog} >
                                <div >
                                    {sers}
                                </div>
                            </Card>
                        </div>
                        <div className="serviceButton">
                            <Button color="primary" id="sensitivityCard" onClick={this.handleLogin}>
                                Sign in instead
                         </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}