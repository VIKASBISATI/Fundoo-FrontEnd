import React, { Component } from 'react'
import { service } from '../services/userService';
import { Card, Button } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Tab, Tabs } from '@material-ui/core/';
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: "black",
                backgroundColor: "green",
            }
        },
        MuiCard: {
            root: {
                overflow: "visible",
            }
        },
        MuiDialogContent: {
            root: {
                padding: "0px",
                "root:first": {
                    child: {
                        paddingTop: "0px"

                    }
                }

            }
        },

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
            cartId: ''
        }
    }
    componentDidMount() {
        service()
            .then(res => {
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
    handleProceed = () => {
        this.props.history.push('/registration');
    }
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
    render() {
        const { value } = this.state;
        const cardColor = this.state.mouseEnter ? "orange" : "grey";
        const serviceArr = this.state.serviceData.map(key => {
            return (
                <div className='cards'>
                    <MuiThemeProvider theme={theme}>
                        <Card className='innerCard' onMouseEnter={() => this.handleMouseEntry(key.id)} onMouseLeave={this.handleMouseExit}
                            style={{ backgroundColor: (this.state.cartId === key.id) ? cardColor : "gray" }} onClick={this.handleCardOpen}>
                            <Card className='outerCard' onMouseEnter={() => this.handleMouseEntry(key.id)} onMouseLeave={this.handleMouseExit}
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
                            ADD TO CART
                        </Card>
                    </MuiThemeProvider>
                    <div>
                        <Dialog position="static"
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
                        </Dialog>
                    </div>
                </div>
            )
        })
        return (
            <div className="container">
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
                <div className="keyDetails">
                    {serviceArr}
                </div>
                <div className="serviceLogin" onClick={this.handleSignIn}>Sign in instead</div>
            </div>
        )
    }
}
export default ServiceCard