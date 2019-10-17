import React, { Component } from 'react'
import DisplayPage from '../components/displayLabelComponent'
export default class DisplayLabel extends Component {
    render() {
        return (
            <DisplayPage props={this.props} />
        )
    }
}