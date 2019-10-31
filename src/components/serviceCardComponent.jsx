import React, { Component } from "react";
import { service, addToCart } from "../services/userService";
import { Card } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { withRouter } from "react-router-dom";
const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        overflow: "visible"
      }
    },
    MuiPaper:{
        elevation1:{
            boxShadow:"none"
        }
    }
  }
});
class ServiceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceData: [],
      open: false,
      price: 0,
      value: 0,
      mouseEnter: false,
      cartId: "",
      cart: "",
      pId: "",
      name: "",
      id: ""
    };
  }
  componentDidMount() {
    service()
      .then(res => {
        console.log("data", res);
        this.setState({
          serviceData: res.data.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleSignIn = () => {
    this.props.history.push("/login");
  };
  handleCardOpen = () => {
    this.setState({
      open: !this.state.open
    });
  };
  handleRemove = () => {
    this.setState({
      open: false
    });
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  // handleProceed = () => {
  //     this.props.history.push('/registration');
  // }
  handleMouseEntry = id => {
    this.setState({
      mouseEnter: true,
      cartId: id
    });
  };
  handleMouseExit = () => {
    this.setState({
      mouseEnter: false
    });
  };
  getRegId(cart) {
    if(!this.props.cartProps){
    console.log("cart i s", cart);
    var data = {
      productId: cart
    };
    addToCart(data)
      .then(res => {
        console.log("response after add to cart ", res);
        this.setState({
          pId: res.data.data.details.productId,
          name: res.data.data.details.product.name,
          id: res.data.data.details.id
        });
        console.log("service name", this.state.name);

        var cartData = {
          pIdCart: this.state.pId,
          cartName: this.state.name,
          idCart: this.state.id
        };
        console.log("service data before sending to registaer", cartData);
        this.props.history.push("/register", cartData);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
  render() {
    // const { value } = this.state;
    const cardColor = this.state.mouseEnter ? "orange" : "#acacac";
    const serviceArr = this.state.serviceData.map(key => {
      return (
          <MuiThemeProvider theme={theme}>
        <Card
          className="service-card"
          onClick={() => this.getRegId(key.id)}
          id={cardColor}
          style={{
            background:
              this.state.cartId === key.id
                ? cardColor
                : "#acacac" && this.props.cartIdd === key.id
                ? this.props.changeColor
                : "#acacac",
                boxShadow:"grey"
          }}
          onMouseEnter={(this.props.cartProps) ? null :
            () => this.handleMouseEntry(key.id)} onMouseLeave={(this.props.cartProps) ?
                (null) : this.handleMouseExit}
        >
          <b>Price : ${key.price} per month</b>
          <b>{key.name}</b>
          <li>${key.price}/month</li>
          <li>{key.description}</li>
        </Card>
        </MuiThemeProvider>
      );
    });
    return this.props.cartProps ? (
      <div className="service-contents"> {serviceArr}</div>
    ) : (
      <div className="service-container">
        <div className="service-header">
          <span>Fundoo Notes</span>
        </div>
        <div className="fundoo-head">
          <span>fundooNotes offered. Choose below service to Register.</span>
        </div>
        <div className="service-contents">{serviceArr}</div>
        <div className="service-btn">
          <span
            style={{ cursor: "pointer", color: "rgb(64, 161, 226)" }}
            onClick={this.handleSignIn}
          >
            Sign in instead
          </span>
        </div>
      </div>
    );
  }
}
export default withRouter(ServiceCard);
