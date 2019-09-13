import React, { Component } from 'react'
import { service, addToCart } from '../services/userService';
import { Card } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from 'react-router-dom'
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: "black",
                backgroundColor: "orange",
            }
        },
        MuiCard: {
            root: {
                overflow: "visible",
            }
        }
    }
})
class ServiceCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceData: [],
            open: false,
            price: 0,
            value: 0,
            mouseEnter: false,
            cartId: '',
            cart: '',
            pId: '',
            name: '',
            id: ''
        }
    }
    componentDidMount() {
        service()
            .then(res => {
                console.log('data', res)
                this.setState({
                    serviceData: res.data.data.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    handleSignIn = () => {
        this.props.history.push('/login');
    }
    handleCardOpen = () => {
        this.setState({
            open: !this.state.open,
        })
    }
    handleRemove = () => {
        this.setState({
            open: false
        })
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    // handleProceed = () => {
    //     this.props.history.push('/registration');
    // }
    handleMouseEntry = (id) => {
        this.setState({
            mouseEnter: true,
            cartId: id
        })
    }
    handleMouseExit = () => {
        this.setState({
            mouseEnter: false
        })
    }
    getRegId(cart) {
        var data = {
            productId: cart
        }
        addToCart(data)
            .then((res) => {
                console.log("response after add to cart ", res);
                this.setState({
                    pId: res.data.data.details.productId,
                    name: res.data.data.details.product.name,
                    id: res.data.data.details.id
                })
                console.log("service name", this.state.name);

                var cartData = {
                    pIdCart: this.state.pId,
                    cartName: this.state.name,
                    idCart: this.state.id
                }
                console.log("service data before sending to registaer", cartData);
                this.props.history.push("/register", cartData);
            }).catch((err) => {
                console.log(err);
            })
    }
    render() {
        // const { value } = this.state;
        const cardColor = this.state.mouseEnter ? "orange" : "grey";
        const serviceArr = this.state.serviceData.map(key => {
            return (
                <div className='cards'>
                    <MuiThemeProvider theme={theme}>
                        <Card className='innerCard'
                            style={{ backgroundColor: (this.state.cartId === key.id) ? cardColor : "grey" &&
                                    (this.props.cartIdd === key.id) ? "orange" : "grey"
                            }}>
                            <Card className='outerCard' onClick={() => this.getRegId(key.id)} onMouseEnter={() => this.handleMouseEntry(key.id)} onMouseLeave={this.handleMouseExit}
                            >
                                <p ><b>Price : ${key.price} per month</b><div style={{ marginLeft: "20px", color: "blue" }}><b>{key.name}</b></div>
                                    <ul >
                                        <li>
                                            ${key.price}/month
                                        </li>
                                        <li>
                                            {key.description}
                                        </li>
                                    </ul>
                                </p>
                            </Card>
                            <div>
                                {(this.props.cartIdd === key.id) ? <b>{this.props.status}</b> : <b>ADDTOCART</b>}
                            </div>
                        </Card>
                    </MuiThemeProvider>
                    <div>
                        {/* <Dialog position="static"
                            onClose={this.handleRemove}
                            open={this.state.open}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <MuiThemeProvider theme={theme}>
                                <DialogContent  >

                                    <AppBar position="static" color="primary">
                                        <h2>Advanced pack details</h2>

                                    </AppBar>
                                    <Tabs value={value} onChange={this.handleChange}>
                                        <Tab label="Feature One" />
                                        <Tab label="Feature Two" />
                                        <Tab label="Feature Three" />
                                    </Tabs>

                                    {value === 0 && <TabContainer>Feature1</TabContainer>}
                                    {value === 1 && <TabContainer>Feature2</TabContainer>}
                                    {value === 2 && <TabContainer>Feature3</TabContainer>}
                                </DialogContent>
                            </MuiThemeProvider>
                            <DialogActions>
                                <div className="dialogButton">
                                    <Button onClick={this.handleRemove} color="primary">
                                        Remove
                                    </Button>
                                    <Button onClick={this.handleProceed} color="primary" autoFocus>
                                        Proceed to checkout
                                    </Button>
                                </div>
                            </DialogActions>
                        </Dialog> */}
                    </div>
                </div>
            )
        })
        return (
            (this.props.cartProps) ?
                <div className="keyDetails1">
                    {serviceArr}
                </div>
                :
                <div>
                    <div>
                        <MuiThemeProvider theme={theme}>
                            <AppBar position="static" color="primary">
                                <h2 className='fundooNotes'>Fundoo Notes</h2>
                            </AppBar>
                        </MuiThemeProvider>
                    </div>
                    <div className="head">
                        <h2 style={{ textAlign: "center" }}>
                            FundooNotes offered. Choose below service to Register.
                    </h2>
                    </div>
                    <div className="keyDetails2">
                        {serviceArr}

                    </div>
                    <div className="serviceLogin" onClick={this.handleSignIn}>Sign in instead</div>
                </div>

        )
    }
}
export default withRouter(ServiceCard)