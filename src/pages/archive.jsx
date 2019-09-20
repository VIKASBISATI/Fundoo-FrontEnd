import React, { Component } from 'react'
import ArchivePage from '../components/archiveComponent'
export default class Archive extends Component {
    render() {
        return (
            <ArchivePage props={this.props} />
        )
    }
}