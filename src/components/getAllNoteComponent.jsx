import React, { Component } from 'react'
import { getAllNotes, updateNotes, colorChange } from '../services/userService'
import { Card, InputBase, Button } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ColorPaletteComponent from './colorPaletteComponent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
export default class GetAllNoteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            color: '',
            open: false,
            id: '',
            title: '',
            colorUpdated: '',
            description: '',
            noteId: ''
        }
    }
    componentDidMount() {
        this.getNotes();
    }
    getNotes = () => {
        getAllNotes().then((res) => {
            console.log('response is', res);
            this.setState({
                notes: res.data.data.data
            })
        })
    }
    handleColor = async (col, noteid) => {
        await this.setState({
            color: col
        })
        var data = {
            noteIdList: [noteid],
            color: this.state.color
        }
        console.log('data in get', data);

        colorChange(data)
        .then((res) => {
            console.log(res);
            this.getNotes();
        }).catch((err) => {
            console.log(err);
        })
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    handleRemove = () => {
        this.setState({
            open: false
        })
    }
    handleNoteClick = () => {
        this.setState({
            open: true
        })
    }
    handleUpdateTitle = (e) => {
        var title = e.target.value;
        this.setState({
            title: title
        })
    }
    handleUpdateDescription = (e) => {
        var description = e.target.value;
        this.setState({
            description: description
        })
    }
    handleUpdate = (id, oldTitle, oldDescription, colorUpdated) => {
        this.setState({
            noteId: id,
            title: oldTitle,
            description: oldDescription,
            open: !this.state.open,
            colorUpdated: colorUpdated
        })
        var data = {
            noteId: this.state.noteId,
            title: this.state.title,
            description: this.state.description
        }
        updateNotes(data).then((res) => {
            this.getNotes();
            console.log('response in get notes is', res)
        }).catch((err) => {
            console.log('err in get all notes update is ', err);
        })
    }
    render() {
        const allNotes = this.state.notes.map((key) => {
            console.log('keyid ',key.id);
            
            return (

                <div className="get-contents">
                    <Card className="get-card1" onClick={this.handleNoteClick} style={{ backgroundColor: key.color }}>
                        <div className="input1">
                            <InputBase className="get-in2"
                                multiline
                                placeholder="Title"
                                id="title"
                                onClick={() => this.handleUpdate(key.id, key.title, key.description, key.color)}
                                value={key.title}
                            />
                        </div>
                        <div className="input2">
                            <InputBase className="get-in1"
                                multiline
                                placeholder="Take a note ...."
                                id="description"
                                onClick={() => this.handleUpdate(key.id, key.title, key.description, key.color)}
                                value={key.description}
                            />
                        </div>
                        <div className="notes-icon-div1">
                            <Tooltip title="Remind me">
                                <AddAlertOutlinedIcon />
                            </Tooltip>
                            <Tooltip title="collaborator">
                                <PersonAddOutlinedIcon />
                            </Tooltip>
                            <Tooltip title="Change color">
                                <ColorPaletteComponent
                                    paletteProps={this.handleColor}
                                    notesId={key.id} />
                            </Tooltip>
                            <Tooltip title="Add image">
                                <ImageOutlinedIcon />
                            </Tooltip>
                            <Tooltip title="Archive">
                                <ArchiveOutlinedIcon />
                            </Tooltip>
                            <Tooltip title="More    ">
                                <MoreVertOutlinedIcon />
                            </Tooltip>
                        </div>
                    </Card>
                    <Dialog position="static"
                        onClose={this.handleRemove}
                        open={this.state.open}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        bodyStyle={{ backgroundColor: 'transparent' }}
                    >
                        <Card className="get-card2" style={{ backgroundColor: this.state.colorUpdated }}>
                            <DialogTitle>
                                <div className="input1">
                                    <InputBase className="get-in2"
                                        multiline
                                        placeholder="Title"
                                        id="title"
                                        value={this.state.title}
                                        onChange={this.handleUpdateTitle}
                                    />
                                </div>
                            </DialogTitle>
                            <DialogContent>
                                <div className="input2">
                                    <InputBase className="get-in1"
                                        multiline
                                        placeholder="Take a note ...."
                                        id="description"
                                        value={this.state.description}
                                        onChange={this.handleUpdateDescription}
                                    />
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <div className="notes-icon-div2">
                                    <Tooltip title="Remind me">
                                        <AddAlertOutlinedIcon />
                                    </Tooltip>
                                    <Tooltip title="collaborator">
                                        <PersonAddOutlinedIcon />
                                    </Tooltip>
                                    <Tooltip title="Change color">
                                        <ColorPaletteComponent
                                            paletteProps={this.handleColor}
                                            notesId={this.state.noteId} />
                                    </Tooltip>
                                    <Tooltip title="Add image">
                                        <ImageOutlinedIcon />
                                    </Tooltip>
                                    <Tooltip title="Archive">
                                        <ArchiveOutlinedIcon />
                                    </Tooltip> 
                                    <Tooltip title="More    ">
                                        <MoreVertOutlinedIcon />
                                    </Tooltip>
                                    <Button onClick={() => this.handleUpdate(this.state.noteId, this.state.title, this.state.description, this.state.color)}>
                                        close
                                    </Button>
                                </div>
                            </DialogActions>
                        </Card>
                    </Dialog>
                </div >
            )
        })
        return (
            <div className="get-container" >
                {allNotes}
            </div>
        )
    }
}