import React, { Component } from 'react'
import { getAllNotes, updateNotes, colorChange } from '../services/userService'
import { Card, InputBase, Button, createMuiTheme, MuiThemeProvider, Chip } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorPaletteComponent from './colorPaletteComponent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DialogActions from '@material-ui/core/DialogActions';
import MoreOptionComponenent from './moreOptionComponenent';
import DialogContent from '@material-ui/core/DialogContent';
import { withRouter } from 'react-router-dom';
import ArchiveComponent from '../components/archiveComponent';
const theme = createMuiTheme({
    overrides: {
        MuiBackdrop: {
            root: {
                backgroundColor: "rgba(0,0,0, 0.01)",
            }
        },
        MuiPaper: {
            elevation24: {
                boxShadow: "none"
            }
        }
    }
})
function titleDescSearch(searchText) {
    return function (val) {
        return val.title.includes(searchText) || val.description.includes(searchText)
    }
}
class GetAllRemindersComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            newNotes: [],
            color: '',
            open: false,
            id: '',
            title: '',
            colorUpdated: '',
            delChip: '',
            description: '',
            noteId: '',
            trashId: '',
            archiveId: ''
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
    updatedCard(upCard) {
        this.setState({
            notes: [...this.state.notes, upCard]
        })
    }
    handleColor = (col, noteid) => {
        var data = {
            noteIdList: [noteid],
            color: col
        }
        this.setState({
            colorUpdated: col
        })
        console.log('data in get', data);
        colorChange(data)
            .then((res) => {
                console.log("ytydydyhegy", res);

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
    handleChipDelete = () => {
        console.log("delete chip");
        this.setState({
            delChip: true
        })

    }
    render() {
        const list = this.props.list ? "get-container1" : "get-container";
        const list1 = this.props.list ? "get-contents1" : "get-contents"
        const list2 = this.props.list ? "get-card1" : "get-card"
        const allNotes = this.state.notes.filter(titleDescSearch(this.props.searchText)).map((key) => {
            // console.log('    keyid ', key.id);
            return (
                (((key.isArchived === false))
                    && (key.isDeleted === false) &&
                    (key.reminder.length > 0) &&
                    <div className={list1}>
                        <Card className={list2} style={{
                            backgroundColor: key.color,
                            margin:"0.5em",
                            boxShadow: "5px 5px 5px grey", borderRadius: "10px",
                            transform: (this.props.menu) ? "translate(80px,0) rotate(360deg)" : (null),
                            transition: (this.props.menu) ? ("300ms") : (null)
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
                            <div className="get-chips">
                                {key.noteLabels.map(data => {
                                    return (
                                        <Chip onDelete={this.handleChipDelete}
                                            label={data.label}>
                                        </Chip>
                                    );
                                })}
                                {
                                    key.reminder.map(data => {
                                        return (
                                            <Chip onDelete={() => this.handleDeleteReminder(key.id)}
                                                icon={<AccessTimeIcon />}
                                                label={data.slice(0, 21)}
                                                size="medium">
                                            </Chip>
                                        );
                                    })
                                }
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
                                <Tooltip title="Unarchive">
                                    <ArchiveComponent archiveNoteId={key.id}
                                    />
                                </Tooltip>
                                <Tooltip title="More">
                                    <MoreOptionComponenent noteId={key.id}
                                        completeNote={key}
                                        deleteUp={this.deleteUp}></MoreOptionComponenent>
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
                                            <Tooltip title="Unarchive">
                                                <ArchiveComponent archiveNoteId={key.id}
                                                />
                                            </Tooltip>
                                            <MoreOptionComponenent noteId={key.id}
                                                completeNote={key}
                                                deleteUp={this.deleteUp}
                                            />
                                            <Button onClick={() => this.handleUpdate(this.state.noteId, this.state.title, this.state.description, this.state.color)}>
                                                close
                                            </Button>
                                        </div>
                                    </DialogActions>
                                </Card>
                            </Dialog>
                        </MuiThemeProvider>
                    </div >
                ))
        })
        return (
            <div className={list} >
                {allNotes}
            </div>
        )
    }
}
export default withRouter(GetAllRemindersComponent);