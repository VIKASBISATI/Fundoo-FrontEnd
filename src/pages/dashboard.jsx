import React, { Component } from 'react'
import DashBoardPage from '../components/dashboardComponent'
import CreateNotesComponent from '../components/createNotesComponent'
import GetAllNoteComponent from '../components/getAllNoteComponent'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state={
            searchText:''
        }
        this.newNote = React.createRef()
    }
    search=(searchText)=>{
        console.log(('search text in dashboard page',searchText));
        
        this.setState({
            searchText:searchText
        })
    }
    display = (upCard) => {
        console.log('upcard', upCard);
        this.newNote.current.updatedCard(upCard)
    }
    render() {
        return (
            <div>
                <DashBoardPage props={this.props} />
                <CreateNotesComponent getNew={this.display} />
                <div className="get-page">
                    <GetAllNoteComponent
                        ref={this.newNote} 
                        getSearchText={this.search}/></div>
            </div>)
    }
}