import React, { Component } from "react";
import WysiwygComponent from "../components/wysiwygComponent";
import { withRouter } from 'react-router-dom'
import DashBoardComponent from '../components/dashboardComponent';
class WysiwygPage extends Component {
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
        console.log("this.props in wysiswgydsg",this.props);
        
        return (
            <div>
            <DashBoardComponent props={this.props} searchBar={this.searchBar}
                    listView={this.listView}
                    menuGet={this.menuGet}/>
            <WysiwygComponent />
            </div>
        );
    }
}
export default withRouter(WysiwygPage);