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
export default class CardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover:false,
            serviceData: [],
            openSnackBar: false,
            SnackBarMessage: ""
        }
    }
    handleLogin = () => {
        this.props.history.push('/login')
    }
    handleMouseHover=()=>{
        this.setState({
            hover:!this.state.hover
        })
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

        console.log("data---------------", this.state.serviceData.length);
        const ser = this.state.serviceData.map((object, index) => {
            console.log('index is --------', index)
            if (index === 0) {
                return (
                    <div>
                        <p ><b>Price : ${object.price} per month<br /></b> <br /><span style={{ color: "blue" }}>{object.name}</span>
                            <ul>
                                <li>
                                    ${object.price}/month
                            </li>
                                <li>
                                    {object.description}
                                </li>
                            </ul>
                        </p>    
                    </div>
                )
            }
        })
        const sers = this.state.serviceData.map((object, index) => {
            if (index === 1) {
                return (
                    <div>
                        <p ><b>Price : ${object.price} per month<br /></b> <br /><span style={{ color: "blue" }}>{object.name}</span>
                            <ul>
                                <li>${object.price}/month</li>
                                <li>{object.description}</li>
                            </ul>
                        </p>
                    </div>
                )
            }
        })
        var clr;
        if(this.state.hover){
            clr={backgroundColor:"yellow"}
        }
        else{
            clr={backgroundColor:"grey"}
        }
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
                        <p id="cardText">FundooNotes offered. Choose belo   w service to register.</p>
                    </div>
                    <div className="cards">
                        <div className="cardDiv1">
                            <Card className="cardsInCard1" sytle={clr} onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
                                <div >
                                <h5 style={{marginLeft:"50px", marginTop:"235px"}}>ADD TO CART</h5>

                                </div>
                            </Card>
                            <Card className="cardsInCard2" sytle={clr} onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
                                <div>
                                    {ser}
                                </div>
                            </Card>
                        </div>
                        <div className="cardDiv2" >
                            <Card className="cardsInCard1" >
                                <div>
                                <h5 style={{marginLeft:"50px", marginTop:"235px"}}>ADD TO CART</h5>

                                </div>
                            </Card>
                            <Card className="cardsInCard2"  >
                                <div >
                                    {sers}
                                </div>
                            </Card>
                        </div>
                        <div className="button">
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