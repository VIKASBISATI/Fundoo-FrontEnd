import React, { Component } from 'react'
import ReminderPage from '../components/reminderComponent'
export default class Reminder extends Component {
    render() {
        return (
            <div>
                <ReminderPage props={this.props} />
            </div>
        )
    }
}