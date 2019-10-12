import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tooltip, Button, MenuItem, createMuiTheme } from '@material-ui/core';
import { DateTimePicker } from 'material-ui-pickers';
import Popper from '@material-ui/core/Popper';
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import Paper from '@material-ui/core/Paper';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { ThemeProvider } from "@material-ui/styles";
import { addReminder } from '../services/userService';
const theme = createMuiTheme({
    overrides: {
        MuiPickersModal: {
            dialogRootWider: {
                minWidth: "380px"
            }
        },
    }
})
class ReminderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPop: false,
            anchorEl: false,
            selectedDate: new Date('2019-08-18T21:11:54'),
        }
    }
    handleDateChange = date => {
        this.setState({
            selectedDate: date
        })
    }
    handleOpen = () => {
        this.setState({
            openPop: !this.state.openPop
        })
    }
    handleOpenPopper(e) {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        })
    }
    handleReminder = () => {
        let data = {
            "noteIdList": [this.props.noteId],
            "reminder": this.state.selectedDate
        }
        this.setState({
            anchorEl: null
        })
        console.log("data in reminder is ", data);
        addReminder(data).then((res) => {
            console.log("res in reminder", res);
            this.props.getUpdatedReminders(true);
        }).catch((err) => {
            console.log('err in hitting api reminder', err);
        })
    }
    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Tooltip title="Remind me">
                        <AddAlertOutlinedIcon onClick={(e) => this.handleOpenPopper(e)}
                        style={{height:"0.7em"}} />
                    </Tooltip>
                    <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} placement="bottom-right">
                        <Paper className="reminder-paper">
                            Reminder:
                        <MenuItem>
                                Later today
                        </MenuItem>
                            <MenuItem>
                                Tomorrow
                        </MenuItem>
                            <MenuItem>
                                Next Week
                        </MenuItem>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker value={this.state.selectedDate} onChange={this.handleDateChange} />
                            </MuiPickersUtilsProvider>
                            <div>
                                <Button onClick={this.handleReminder}>Save</Button>
                            </div>
                        </Paper>
                    </Popper>
                </ThemeProvider>
            </div>
        )
    }
}
export default withRouter(ReminderComponent)