import React, { Component } from 'react'
import DashBoardPage from '../components/dashboardComponent'
import CreateNotesComponent from '../components/createNotesComponent'
import GetAllNoteComponent from '../components/getAllNoteComponent'
export default class Dashboard extends Component {
    render() {
        return (
            <div>
            <DashBoardPage props={this.props} />
            <CreateNotesComponent />
         <div className="get-page">   <GetAllNoteComponent/></div>

            </div>
        )
    }
}