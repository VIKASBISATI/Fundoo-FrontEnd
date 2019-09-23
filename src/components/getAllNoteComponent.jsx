import React, { Component } from 'react'
import { getAllNotes, updateNotes, colorChange } from '../services/userService'
import { Card, InputBase, Button, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import TrashComponent from '../components/trashComponent'
import ColorPaletteComponent from './colorPaletteComponent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ArchiveComponent from '../components/archiveComponent';
const theme = createMuiTheme({
    overrides: {
        MuiBackdrop: {
            root: {
                backgroundColor: "rgba(0,0,0, 0.18)",
            }
        }
    }
})
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
    handleColor = (col, noteid) => {
        var data = {
            noteIdList: [noteid],
            color: col
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
            console.log('keyid ', key.id);
            return (
                (((key.isArchived === false)
                    && (key.isDeleted === false))
                    &&
                    <div className="get-contents">
                        <Card className="get-card1" style={{
                            backgroundColor: key.color,
                            boxShadow: "5px 5px 5px grey", borderRadius: "18px",
                            width: "225px"
                        }}>
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
                                    <ArchiveComponent archiveNoteId={key.id} />
                                </Tooltip>
                                <Tooltip title="More">
                                    <TrashComponent trashNoteId={key.id} />
                                </Tooltip>
                            </div>
                        </Card>
                        <MuiThemeProvider theme={theme}>
                            <Dialog position="static"
                                onClose={this.handleRemove}
                                open={this.state.open}
                            >
                                <Card className="get-card2" style={{ backgroundColor: this.state.colorUpdated }} >
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
                                                <ArchiveComponent archiveNoteId={key.id} />
                                            </Tooltip>
                                            <Tooltip title="More">
                                                <TrashComponent trashNoteId={key.id} />
                                            </Tooltip>
                                            <Button onClick={() => this.handleUpdate(this.state.noteId, this.state.title, this.state.description, this.state.color)}>
                                                close
                                    </Button>
                                        </div>
                                    </DialogActions>
                                </Card>
                            </Dialog>
                        </MuiThemeProvider>
                    </div>
                ))
        })
        return (
            <div className="get-container">
                {allNotes}
            </div>
        )
    }
}