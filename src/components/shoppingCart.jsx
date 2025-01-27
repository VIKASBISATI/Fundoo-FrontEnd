import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Divider, Button, MobileStepper, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { myCart, placeOrder } from '../services/cartServices';

const theme = createMuiTheme({
    overrides: {
        MuiLinearProgress: {
            root: {
                height: "4px",
                overflow: "hidden",
                position: "fixed"
            }
        }
    }
})
class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartDetails: {},
            productName: '',
            desc: '',
            place: true,
            address: '',
            order: true,
            cartId: '',
            openSnackBar: false,
            SnackBarMessage: "",
            activeStep: 0
        }
    }
    componentDidMount() {
        console.log("this.props.location.state.cartId", this.props);
        // this.setState({
        // })
        this.getDetailsOfCart();
    }

    getDetailsOfCart = () => {
        myCart().then(res => {
            console.log("res after hitting shopping cart", res.data.data);
            this.setState({
                cartDetails: res.data.data,
                productName: res.data.data.product.name,
                desc: res.data.data.product.description
            })
            console.log("The cart details are", this.state.desc);
        }).catch(err => {
            console.log("err in shopping cart details", err);
        })
    }

    handleProceed = async () => {
        await this.setState({
            place: false,
            openSnackBar: true,
            SnackBarMessage: "do u really want to proceed"
        })
    }

    handleAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }

    handlePlaceOrder = () => {
        if (this.state.address !== '') {
            let data = {
                "cartId": localStorage.getItem('cart'),
                "address": this.state.address,
            }
            placeOrder(data).then(res => {
                console.log("res after hitting place order is ", res);
                this.setState({
                    order: false,
                    activeStep: this.state.activeStep + 1
                })
            }).catch(err => {
                console.log("err in hitting place order ", err);

            })
        } else {
            this.setState({
                openSnackBar: 'true',
                SnackBarMessage: 'failed! enter the address...'
            })
        }
    }

    snackbarClose = () => {
        this.setState({
            openSnackBar: false
        })
    }

    handleOk = async () => {
        await this.setState({
            openSnackBar: false,
            activeStep: this.state.activeStep + 1
        })
        document.getElementById('addr').focus();

    }

    render() {
        return (
            <div className="shopping-container">
                <div className="card-container1">
                    <div className="shopping-card1" style={{ backgroundColor: "#fb0" }}>
                        <span style={{ fontSize: "1rem" }}>FundooNotes</span>
                    </div>
                    <div>
                        {/* <MuiThemeProvider theme={theme}>
                            <MobileStepper
                                variant="progress"
                                steps={3}
                                // position="fixed"
                                activeStep={this.state.activeStep}
                            />
                        </MuiThemeProvider> */}
                    </div>
                </div>
                <div>
                    {this.state.order ?
                        this.state.place ?
                            <div className="shoppingcart-header">
                                <span style={{ fontSize: "1rem" }}><strong>Shopping Cart</strong></span>
                            </div>
                            :
                            <div className="shoppingcart-header">
                                <span style={{ fontSize: "1rem" }}><strong>Review order</strong></span>
                            </div>
                        :
                        <div className="shoppingcart-header">
                            <span style={{ fontSize: "1rem" }}><strong>Order List</strong></span>
                        </div>
                    }
                    <Divider />
                    {this.state.order ?
                        this.state.place ?
                            <div className="shopping-details">
                                <div>
                                    <div className="shopping-card2" style={{ backgroundColor: "grey" }}>
                                        <span style={{ fontSize: "1rem", color: "#fff" }}>${this.state.cartDetails.price} per month {this.state.productName}
                                        </span>
                                    </div>
                                </div>
                                <div className="cart-info1">
                                    <span style={{ fontSize: "1rem", color: "#40a1e2" }}>{this.state.productName} pack details</span>
                                    <li>
                                        <span style={{ fontSize: "1rem" }}>{this.state.desc}</span>
                                    </li>
                                </div>
                                <div className="cart-info2">
                                    <span style={{ fontSize: "1rem" }}><strong>Price</strong></span>
                                    <span style={{ fontSize: "1rem", color: "#40a1e2" }}>${this.state.cartDetails.price}</span>
                                </div>
                                <div className="cart-info3">
                                    <span style={{ fontSize: "1rem" }}><strong>Validity</strong></span>
                                    <span style={{ fontSize: "1rem", color: "#40a1e2" }}>per month</span>
                                </div>
                                <div>
                                    <div className="total-box">
                                        <span style={{ fontSize: "0.9rem" }}>SubTotal(1 item): ${this.state.cartDetails.price}</span>
                                        <p style={{
                                            fontSize: "0.9rem", color: "#fff",
                                            backgroundColor: "#40a1e2", borderRadius: "2px", cursor: "pointer", padding: "4px"
                                        }} onClick={this.handleProceed}>Proceed to Checkout</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="shopping-details">
                                <div>
                                    <div className="shopping-card2" style={{ backgroundColor: "grey" }}>
                                        <span style={{ fontSize: "1rem", color: "#fff" }}>${this.state.cartDetails.price} per month {this.state.productName}
                                        </span>
                                    </div>
                                </div>
                                <div className="cart-info1">
                                    <span style={{ fontSize: "1rem", color: "#40a1e2" }}>{this.state.productName} pack details</span>
                                    <li>
                                        <span style={{ fontSize: "1rem" }}>{this.state.desc}</span>
                                    </li>
                                </div>
                                <div className="cart-info2">
                                    <span style={{ fontSize: "1rem", color: "#40a1e2" }}>${this.state.cartDetails.price}</span>
                                    <span style={{ fontSize: "1rem" }}>per month</span>
                                </div>
                                <div>
                                    <div className="total-box">
                                        <p style={{
                                            fontSize: "0.9rem", color: "#fff",
                                            backgroundColor: "#40a1e2", borderRadius: "2px",
                                            cursor: "pointer", padding: "4px"
                                        }} onClick={this.handlePlaceOrder}>Place your order</p>
                                        <span style={{ fontSize: "0.9rem" }}>SubTotal(1 item): ${this.state.cartDetails.price}</span>
                                    </div>
                                </div>
                            </div>
                        :
                        <div className="shopping-details">
                            <div>
                                <div className="shopping-card2" style={{ backgroundColor: "grey" }}>
                                    <span style={{ fontSize: "1rem", color: "#fff" }}>${this.state.cartDetails.price} per month {this.state.productName}
                                    </span>
                                </div>
                            </div>
                            <div className="cart-info1">
                                <span style={{ fontSize: "1rem", color: "#40a1e2" }}>{this.state.productName} pack details</span>
                                <li>
                                    <span style={{ fontSize: "1rem" }}>{this.state.desc}</span>
                                </li>
                            </div>
                            <div className="cart-info2">
                                <span style={{ fontSize: "1rem", color: "#40a1e2" }}>${this.state.cartDetails.price}</span>
                                <span style={{ fontSize: "1rem" }}>per month</span>
                            </div>
                        </div>
                    }
                    <Divider />
                    {this.state.order ?
                        this.state.place ?
                            <div className="cart-info4">
                                <span style={{ fontSize: "1rem", color: "#40a1e2" }}>SubTotal( 1 item ): ${this.state.cartDetails.price}</span>
                            </div>
                            :
                            <div className="cart-info5">
                                <div>
                                    <textarea className="shopping-textArea" id="addr" value={this.state.address} onChange={this.handleAddress}
                                        placeholder="address"
                                    />
                                </div>
                                <div className="payment-options">
                                    <span style={{ fontSize: "1rem" }}>payment method</span>
                                    <span style={{ fontSize: "1rem", color: "#40a1e2" }}>Cash on Delivery</span>
                                </div>
                            </div>
                        : (null)
                    }
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
                        this.state.place !== false ?
                            <Button onClick={this.snackbarClose} color="secondary" style={{ textTransform: "none" }} >
                                please enter address
                        </Button>
                            :
                            <Button onClick={this.handleOk} color="secondary" style={{ textTransform: "none" }} >
                                Proceed
                            </Button>
                    ]}
                />
            </div>
        )
    }
}
export default withRouter(ShoppingCart)