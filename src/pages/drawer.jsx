import React, { Component } from 'react'
import DrawerPage from '../components/drawerComponent'
export default class Drawer extends Component {
    render() {
        return (
            <div>
                <DrawerPage props={this.props} />
            </div>
        )
    }
}