import React, { Component } from "react";
import TrashPage from "../components/trashComponent";
export default class Trash extends Component {
    render() {
        return (
            <TrashPage props={this.props} />
        );
    }
}