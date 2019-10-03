import React, { Component } from "react";
import GetAllRemindersComponent from "../components/getAllRemindersComponent";
import DashBoardComponent from '../components/dashboardComponent'
export default class GetReminders extends Component {
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
                <div className="get-archive">
                    <GetAllRemindersComponent props={this.props}
                        list={this.state.list}
                        menu={this.state.menu}
                    />
                </div>
            </div>
        );
    }
}
