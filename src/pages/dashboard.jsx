import React, { Component } from 'react'
import DashboardComponent from '../components/dashboardComponent'
import CreateNotesComponent from '../components/createNotesComponent'
import GetAllNoteComponent from '../components/getAllNoteComponent'
import { withRouter } from "react-router-dom";
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            list: false,
            menu: false
        }
        this.newNote = React.createRef()
        // console.log("this.props in constructor",this.props);
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
        // console.log("search porps",this.props);
        return (
            <div>
                <DashboardComponent searchBar={this.searchBar}
                    listView={this.listView}
                    menuGet={this.menuGet}
                />
                <CreateNotesComponent getNew={this.display} />
                <div className="get-page">
                    <GetAllNoteComponent
                        ref={this.newNote}
                        searchText={this.state.searchText}
                        list={this.state.list}
                        menu={this.state.menu}
                    /></div>
            </div>)
    }
}
export default withRouter(Dashboard)