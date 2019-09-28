import React, { Component } from "react";
import GetDeletedComponent from "../components/getDeletedComponent";
import DashBoardComponent from '../components/dashboardComponent'
export default class GetDeletePage extends Component {
    render() {
        return (
            <div>
                <DashBoardComponent props={this.props} />
                <div className="get-deleted">
                    <GetDeletedComponent props={this.props} />
                </div>
            </div>
        );
    }
}
