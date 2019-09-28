import React, { Component } from "react";
import GetArchiveComponent from "../components/getArchiveComponent";
import DashBoardComponent from '../components/dashboardComponent'
export default class ArchivePage extends Component {
    render() {
        return (
            <div>
                <DashBoardComponent props={this.props} />
                <div className="get-archive">
                    <GetArchiveComponent props={this.props} />
                </div>
            </div>
        );
    }
}
