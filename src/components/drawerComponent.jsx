import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from 'react-router-dom'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { MenuItem, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: "9.6%"
            }, paperAnchorLeft: {
                    width: "15%"
            }
        }
    }
})
class DrawerComponent extends Component {
    constructor() {
        super();
        this.state = {
            open: true
        }
    }
    render() {
        return (
            <div className="drawer-container">
                <MuiThemeProvider theme={theme}>
                    <Drawer variant="persistent" overflow="auto" open={this.props.menuSelect} className="drawer-css">
                        <MenuItem id="note">
                            <EmojiObjectsIcon />
                            Notes
                     </MenuItem>
                        <MenuItem id="note">
                            <NotificationsNoneOutlinedIcon />
                            Reminders
                     </MenuItem>
                        <Divider />
                        <div>
                            <b>Labels</b>
                            <MenuItem id="note">
                                <EditIcon />
                                EditLabels
                    </MenuItem>
                            <Divider />
                        </div>
                        <MenuItem id="note">
                            <ArchiveIcon />
                            Archive
                     </MenuItem>
                        <MenuItem id="note">
                            <DeleteIcon />
                            Bin
                     </MenuItem>
                        <Divider />
                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(DrawerComponent);