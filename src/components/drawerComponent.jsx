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
            // paper: {
            //     top: "9.6%"
            // }, 
            paperAnchorLeft: {
                width: 250,
                top: 65,
                background: 'white'
            },
            paperAnchorDockedLeft: {
                borderColor: "white"
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
                    <Drawer variant="persistent" overflow="auto"
                        open={this.props.menuSelect}
                        className="drawer-css">
                        <MenuItem id="note">
                            <EmojiObjectsIcon style={{paddingRight:"15%"}}/>
                            Notes
                     </MenuItem>
                        <MenuItem id="note">
                            <NotificationsNoneOutlinedIcon style={{paddingRight:"15%"}}/>
                            Reminders
                     </MenuItem>
                        <Divider />
                        <div>
                        <h6 style={{paddingLeft:"20px"}}>LABLES</h6>
                            <MenuItem id="note">
                                <EditIcon style={{paddingRight:"15%"}}/>
                                EditLabels
                    </MenuItem>
                            <Divider />
                        </div>
                        <MenuItem id="note">
                            <ArchiveIcon style={{paddingRight:"15%"}}/>
                            Archive
                     </MenuItem>
                        <MenuItem id="note">
                            <DeleteIcon style={{paddingRight:"15%"}}/>
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