import React, { Component } from 'react'
import CreateNotesPage from '../components/createNotesComponent'
export default class CreateNotes extends Component {
    render() {
        return (
            <CreateNotesPage props={this.props} />
        )
    }
}