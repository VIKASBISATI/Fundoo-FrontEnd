import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from 'react-router-dom';
import EditLabelComponent from './editLabelComponent'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import { MenuItem, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
const theme = createMuiTheme({
    overrides: {
        // MuiPaper: {
        //     root: {
        //         overflow: "auto"
        //     }
        // },
        MuiDrawer: {
            paperAnchorLeft: {
                width: 250,
                top: 65,
                height: "90%",
                background: 'white',
                overflowY: 'hidden'
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
            open: true,
            dialogOpen: false,
            title: ''
        }
    }
    handleEdit = () => {
        this.setState({
            dialogOpen: !this.state.dialogOpen
        })
    }

    handleUpdateTitle = (e) => {
        var title = e.target.value;
        this.setState({
            title: title
        })
    }
    render() {
        return (
            <div className="drawer-container">
                <MuiThemeProvider theme={theme}>
                    <Drawer variant="persistent"
                        open={this.props.menuSelect}
                        className="drawer-css">
                        <MenuItem id="note">
                            <EmojiObjectsIcon style={{ paddingRight: "15%" }} />
                            Notes
                     </MenuItem>
                        <MenuItem id="note">
                            <NotificationsNoneOutlinedIcon style={{ paddingRight: "15%" }} />
                            Reminders
                     </MenuItem>
                        <Divider />
                        <div style={{ overflowY: "auto", maxHeight: "319px" }}>
                            <h6 style={{ paddingLeft: "20px" }}>LABLES</h6>
                            <EditLabelComponent />
                            <Divider />
                        </div>
                        <MenuItem id="note">
                            <ArchiveIcon style={{ paddingRight: "15%" }} />
                            Archive
                     </MenuItem>
                        <MenuItem id="note">
                            <DeleteIcon style={{ paddingRight: "15%" }} />
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