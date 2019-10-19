import React, { Component } from "react";
import GetDeletedComponent from "../components/getDeletedComponent";
import DashBoardComponent from '../components/dashboardComponent';
export default class GetDeletePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            list: false,
            menu: false
        }
        // console.log("this.props in constructor",this.props);
        this.newNote = React.createRef()
    }
    searchBar = (searchText) => {
        console.log('search text in dash', searchText);
        this.setState({
            searchText: searchText
        })
    }
    display = (upCard) => {
        console.log('upcard', upCard);
        this.newNote.current.updatedCard(upCard)
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
                    searchBar={this.searchBar}
                    menuGet={this.menuGet}
                    listView={this.listView} />
                <div className="get-deleted">
                    <GetDeletedComponent props={this.props}
                        ref={this.newNote}
                        searchText={this.state.searchText}
                        list={this.state.list}
                        menu={this.state.menu} />
                </div>
            </div>
        );
    }
}
