import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { withRouter } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import LabelIcon from '@material-ui/icons/Label';
import Divider from '@material-ui/core/Divider';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { getLabel } from '../services/userService';
import { label } from '../services/userService';
import { MuiThemeProvider, createMuiTheme, Card, InputBase, Button, MenuItem } from '@material-ui/core';
const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
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
class EditLabelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            title: '',
            labels: []
        }
    }
    componentDidMount() {
        this.getLabels();
    }

    getLabels = () => {
        getLabel().then((res) => {
            console.log('response from label', res);
            this.setState({
                labels: res.data.data.details
            })
            console.log("labels dtaa", this.state.labels);
        })
    }
    handleRemove = () => {
        this.setState({
            open: false
        })
    }
    handleUpdateTitle = (e) => {
        var title = e.target.value;
        this.setState({
            title: title
        })
    }
    handleEdit = () => {
        this.setState({
            dialogOpen: !this.state.dialogOpen
        })
    }
    handleClear = () => {
        this.setState({
            title: ''
        })
    }
    handleDone = () => {
        var data = {
            "label": this.state.title,
            "isDeleted": false,
            "userId": localStorage.getItem('userId')
        }
        label(data).then((res) => {
            console.log('res after hitting api label', res.data);
            this.setState({
                title: ''
            })
            this.getLabels();
        }).catch((err) => {
            console.log('err in hitting api label', err);
        })
    }
    handleClose = () => {
        this.setState({
            dialogOpen: false

        })
    }
    render() {
        const labelMap = this.state.labels.map((key) => {
            return (
                <div>
                    <MenuItem id="note">
                        <LabelOutlinedIcon style={{ paddingRight: "15%" }} />
                        {key.label}
                    </MenuItem>
                </div>
            )
        })
        const labelMap1 = this.state.labels.map((key) => {
            return (
                <div className="label1-map">
                    <LabelIcon />
                    {key.label}
                    <EditIcon />
                </div>
            )
        })
        return (
            <div>
                <div style={{ overflowY: "auto", maxHeight: "250px" }}>
                    {labelMap}
                </div>
                <MenuItem id="note" onClick={this.handleEdit} className="labelData" >
                    <EditIcon style={{ paddingRight: "15%" }} />
                    EditLabels
                </MenuItem>
                <div>
                    <MuiThemeProvider theme={theme}>
                        <Dialog position="static"
                            open={this.state.dialogOpen}
                            onClose={this.handleClose}
                        >
                            <Card className="get-card2">
                                <DialogTitle>
                                    Edit labels
                            </DialogTitle>
                                <DialogContent>
                                    <div className="edit-input">
                                        <DoneOutlinedIcon onClick={this.handleDone} />
                                        <InputBase className="get-in2"
                                            placeholder="Create new label"
                                            id="title"
                                            value={this.state.title}
                                            onChange={this.handleUpdateTitle}
                                        />
                                        <ClearOutlinedIcon onClick={this.handleClear} />
                                    </div>
                                    <div className="edit-map">{labelMap1}</div>
                                    <Divider />
                                    <div id="edit-button">
                                        <Button onClick={this.handleDone}>Done</Button>
                                    </div>
                                </DialogContent>
                            </Card>
                        </Dialog>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}
export default withRouter(EditLabelComponent)