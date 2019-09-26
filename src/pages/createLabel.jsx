import React, { Component } from 'react'
import CreateLabelPage from '../components/createLabelComponenent'
export default class CreateNotes extends Component {
    render() {
        return (
            <CreateLabelPage props={this.props} />
        )
    }
}