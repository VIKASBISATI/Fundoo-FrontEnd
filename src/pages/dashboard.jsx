import React, { Component } from 'react'
import DashBoardPage from '../components/dashboardComponent'
export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <DashBoardPage props={this.props}/>
            </div>
        )
    }
}
