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
            arc: true,
            noted: true,
            trashed: true,
            title: '',
            appTitle:"FundooNotes"
        }
        this.handleArchive = this.handleArchive.bind(this)
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
    handleNotes = async () => {
        console.log("yes handle trash");
        await this.setState({
            // noted: this.state.noted
            appTitle:"FundooNotes"
        })
        // console.log("yes handle trash", this.state.noted);
        // this.props.changeToNote(this.state.noted);
        this.props.history.push('/dashboard',this.state.appTitle)
    }
    handleArchive =async () => {
       await this.setState({
            appTitle: "Archive"
        })
        // console.log("yes handle trash", this.state.arc);
        // this.props.changeToArchive(this.state.arc);
        this.props.history.push('/getArchive',this.state.appTitle)
    }
    handleTrash = async () => {
        console.log("yes handle trash");
        await this.setState({
            appTitle:"Trash"
        })
        // console.log("yes handle trash", this.state.trashed);
        // this.props.changeToTrash(this.state.trashed);
        this.props.history.push('/getTrash',this.state.appTitle)
    }
    handleReminders=async()=>{
        await this.setState({
            appTitle:"Reminders"
        })
        this.props.history.push('/getReminders',this.state.appTitle)
    }
    render() {
        return (
            <div className="drawer-container">
                <MuiThemeProvider theme={theme}>
                    <Drawer variant="persistent"
                        open={this.props.menuSelect}
                        className="drawer-css">
                        <MenuItem id="note" onClick={this.handleNotes}>
                            <EmojiObjectsIcon style={{ paddingRight: "15%" }} />
                            Notes
                     </MenuItem>
                        <MenuItem id="note" onClick={this.handleReminders}>
                            <NotificationsNoneOutlinedIcon style={{ paddingRight: "15%" }} />
                            Reminders
                     </MenuItem>
                        <Divider />
                        <div>
                            <h6 style={{ paddingLeft: "20px" }}>LABLES</h6>
                            <EditLabelComponent />
                            <Divider />
                        </div>
                        <MenuItem id="note" onClick={this.handleArchive}>
                            <ArchiveIcon style={{ paddingRight: "15%" }} />
                            Archive
                     </MenuItem>
                        <MenuItem id="note" onClick={this.handleTrash}>
                            <DeleteIcon style={{ paddingRight: "15%" }} />
                            Trash
                     </MenuItem>
                        <Divider />
                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(DrawerComponent);