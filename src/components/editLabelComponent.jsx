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
import DeleteIcon from '@material-ui/icons/Delete';
import { editNoteLabel } from '../services/userService';
import { deleteNoteLabel } from '../services/userService'
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
            },
            MuiSvgIcon: {
                root: {
                    width: "0",
                    height: "0.7em"
                }
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
            mouse: false,
            trueIcon: false,
            labelName: '',
            labelId: '',
            input: false,
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
        // console.log("labels are ", this.state.labels[0].length);
        for (let i = 0; i < this.state.labels.length; i++) {
            for (let j = 0; j < 4; j++) {
                console.log("lbaels", this.state.labels[i].label);
            }
        }
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
            dialogOpen: false,
            trueIcon: !this.state.trueIcon
        })
    }
    handleMouseOver = async (labelName) => {
        await this.setState({
            mouse: true,
            labelName: labelName
        })
    }
    handleMouseOut = async (labelName) => {
        await this.setState({
            mouse: false,
            labelName: labelName
        })
    }
    handleLabel = async (labelName, labelId) => {
        console.log("label inae is ", labelName);
        await this.setState({
            input: true,
            labelName: labelName,
            mouse: true,
            trueIcon: true,
            labelId: labelId
        })
    }
    handleLabelChange = async (e) => {
        await this.setState({
            labelName: e.target.value
        })
    }
    handleDoneLables = async () => {
        var data = {
            "label": this.state.labelName,
            "labelId": this.state.labelId
        }
        await this.setState({
            input: false,
            mouse: false,
            trueIcon: false,
        })
        editNoteLabel(data).then((res) => {
            console.log("Response after hitting updatenoteslabel", res);
            this.getLabels();
        }).catch((err) => {
            console.log("error in hitting update notes label", err);
        })
    }
    handleDeleteLabel = (labelId) => {
        console.log("labe3id is ", labelId);
        var data = {
            "labelId": labelId
        }
        deleteNoteLabel(data).then((res) => {
            console.log("res after hitting api", res);
            this.getLabels();
        }).catch((err) => {
            console.log("error in hitting delete notes label", err);
        })
    }
    handleDisplay=(label)=>{
        // var data={
        //     labelName:label
        // };
        // getNotesByLabel(data,label).then((res)=>{
        //     console.log("Response after hitting get label",res);
        // }).catch((err)=>{
        //     console.log("Err in hitting get label",err);
        // })
        this.props.history.push(`/dispLabel/${label}`,label)
    }
    render() {
        const labelMap = this.state.labels.map((key) => {
            console.log('labelid in edit label component', key.id);

            return (
                <div>
                    <MenuItem id="note" onClick={()=>this.handleDisplay(key.label)}>
                        <LabelOutlinedIcon style={{ paddingRight: "15%" }} />
                        {key.label}
                    </MenuItem>
                </div>
            )
        })
        const labelMap1 = this.state.labels.map((key) => {
            return (
                <div className="label1-map"
                >
                    {this.state.trueIcon && key.id === this.state.labelId ? <DeleteIcon
                        onClick={() => this.handleDeleteLabel(key.id)} /> :
                        this.state.mouse && key.label === this.state.labelName ?
                            <div className="del">
                                <DeleteIcon
                                    onMouseOut={() => this.handleMouseOut(key.label)}
                                    onClick={() => this.handleDeleteLabel(key.id)} />
                            </div> :
                            < LabelIcon
                                onMouseOver={() => this.handleMouseOver(key.label)}
                            />
                    }
                    {/* {this.state.input ?
                        <InputBase 
                            value={key.label}
                            onClick={this.handleEditIcon(key.label, key.id)}
                        />
                        :
                        <InputBase
                            value={this.state.edit}
                            onChange={this.handleUpdateTitle}
                        />
                    } */}
                    {this.state.input && key.id === this.state.labelId ?
                        <InputBase
                            id="title"
                            value={this.state.labelName}
                            onChange={this.handleLabelChange}
                        />
                        :
                        <InputBase
                            id="title"
                            value={key.label}
                            onClick={() => this.handleLabel(key.label, key.id)}
                        />
                    }
                    {this.state.trueIcon && key.id === this.state.labelId ?
                        <DoneOutlinedIcon onClick={this.handleDoneLables} /> :
                        <EditIcon />
                    }
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