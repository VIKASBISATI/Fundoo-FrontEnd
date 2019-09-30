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
            list:false
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
    listview=(value)=>{
        this.setState({
            list:value
        })
    }
    render() {
        // console.log("search porps",this.props);
        return (
            <div>
                <DashboardComponent searchBar={this.searchBar} 
                listview={this.listview}/>
                <CreateNotesComponent getNew={this.display} />
                <div className="get-page">
                    <GetAllNoteComponent
                        ref={this.newNote}
                        searchText={this.state.searchText}
                        list={this.state.list}
                    /></div>
            </div>)
    }
}
export default withRouter(Dashboard)