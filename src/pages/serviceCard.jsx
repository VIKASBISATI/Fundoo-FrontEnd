import React, { Component } from "react";
import ServiceComponent from "../components/serviceCardComponent";
class ServiceCard extends Component {
    render() {
        return (
                <ServiceComponent props={this.props}/>
        );
    }
}
export default ServiceCard;