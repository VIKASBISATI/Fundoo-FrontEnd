import React, { Component } from 'react'
import EditPage from '../components/editComponent'
export default class Edit extends Component {
    render() {
        return (
            <div>
                <EditPage props={this.props} />
            </div>
        )
    }
}