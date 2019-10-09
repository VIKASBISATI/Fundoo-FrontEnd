import React, { Component } from 'react'
import CollaboratorPage from '../components/collaboratorComponent'
export default class Collaborator extends Component {
    render() {
        return (
            <CollaboratorPage props={this.props} />
        )
    }
}