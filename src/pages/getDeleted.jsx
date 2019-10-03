import React, { Component } from "react";
import GetDeletedComponent from "../components/getDeletedComponent";
import DashBoardComponent from '../components/dashboardComponent'
export default class GetDeletePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            list: false,
            menu: false
        }
        // console.log("this.props in constructor",this.props);
    }
    listView = (value) => {
        this.setState({
            list: value
        })
    }
    menuGet = (menu) => {
        this.setState({
            menu: menu
        })
    }
    render() {
        return (
            <div>
                <DashBoardComponent props={this.props}
                    menuGet={this.menuGet}
                    listView={this.listView}
                />
                <div className="get-deleted">
                    <GetDeletedComponent props={this.props}
                        list={this.state.list}
                        menu={this.state.menu} />
                </div>
            </div>
        );
    }
}
