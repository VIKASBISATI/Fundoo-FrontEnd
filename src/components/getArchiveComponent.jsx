import React, { Component } from 'react'
import { getAllNotes, updateNotes, colorChange } from '../services/userService'
import { Card, InputBase, Button, createMuiTheme, MuiThemeProvider, Chip } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ReminderComponent from './reminderComponent';
import CollaboratorComponent from '../components/collaboratorComponent';
import ColorPaletteComponent from './colorPaletteComponent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MoreOptionComponenent from './moreOptionComponenent'
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
class GetArchiveComponent extends Component {
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
            openSnackBar: false,
            SnackBarMessage: "",
            archiveId: '',
            count: 0,
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
    snackbarClose = () => {
        this.setState({
            openSnackBar: !this.state.openSnackBar
        })
    }
    updatedCard(upCard) {
        this.setState({
            notes: [...this.state.notes, upCard]
        })
    }
    deleteUp = async (trashNoteId) => {
        // console.log("note in delUp", this.state.notes);
        // var delId = trashNoteId;
        // var newArr = this.state.notes;
        // console.log("trashnotes id is ", delId);
        // console.log("new array is ", newArr);
        // console.log('yes or not', newArr[0].id === "5d88951ca0a6a900185be37c");
        // newArr[37].isDeleted = true;
        // for (let i = 0; i < newArr.length; i++) {
        //     console.log("yes entered");
        //     if (newArr[i].id === delId) {
        //         console.log("yes ", delId);
        //         newArr[i].isDeleted = true;
        //         newArr[i].isArchived = false;
        //         newArr[i].isPinned = false;
        //     }
        // }
        // this.setState({
        //     notes: newArr
        // })
        await this.setState({
            trashId: trashNoteId,
            open: false
        })
        this.getNotes();
    }
    arcUp = (noteId) => {
        // console.log("note in delUp", this.state.notes);
        // var arcId = noteId;
        // var newArr1 = this.state.notes;
        // console.log("trashnotes id is ", arcId);
        // for (let i = 0; i < newArr1.length; i++) {
        //     console.log("yes entered");
        //     if (newArr1[i].id === arcId) {
        //         console.log("yes ", arcId);
        //         newArr1[i].isDeleted = false;
        //         newArr1[i].isArchived = true;
        //         newArr1[i].isPinned = false;
        //     }
        // }
        // this.setState({
        //     notes: newArr1
        // })
        this.setState({
            archiveId: noteId,
            openSnackBar: !this.state.openSnackBar,
            SnackBarMessage: "Note unarchived"
        })
        console.log("noteid is in arcup", noteId);
        this.setState({
            archiveId: noteId,
            open: false
            // open: !this.state.open
        })
        this.getNotes();
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
    // deleteUp = (trashNoteId) => {
    //     console.log("note in delUp", this.state.notes);
    //     var delId = trashNoteId;
    //     var newArr = this.state.notes;
    //     console.log("trashnotes id is ", delId);
    //     console.log("new array is ", newArr);
    //     console.log('yes or not', newArr[0].id === "5d88951ca0a6a900185be37c");
    //     newArr[37].isDeleted = true;
    //     for (let i = 0; i < newArr.length; i++) {
    //         console.log("yes entered");
    //         if (newArr[i].id === delId) {
    //             console.log("yes ", delId);
    //             newArr[i].isDeleted = true;
    //             newArr[i].isArchived = false;
    //             newArr[i].isPinned = false;
    //         }
    //     }
    //     this.setState({
    //         notes: newArr
    //     })
    //     this.setState({
    //         trashId: trashNoteId,
    // open: !this.state.open
    //     })
    // }
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
            console.log("count in archive", this.state.count);
            // console.log('    keyid ', key.id);
            {this.state.count++}
            return (
                
                (((key.isArchived === true))
                    && (key.isDeleted === false) &&
                    <div className={list1}>
                        <Card className={list2} style={{
                            backgroundColor: key.color,
                            borderRadius: "10px",
                            margin:"0.5em",
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
                            </div>
                            <div className="notes-icon-div1">
                                <ReminderComponent noteId={key.id}
                                    getUpdatedReminders={this.getUpdatedReminders}
                                />
                                <CollaboratorComponent noteToCollab={key.id}
                                    addCollab={this.addCollab}
                                    remCollab={this.remCollab} />
                                <Tooltip title="Change color">
                                    <ColorPaletteComponent
                                        paletteProps={this.handleColor}
                                        notesId={key.id} />
                                </Tooltip>
                                <Tooltip title="Add image">
                                    <ImageOutlinedIcon style={{ height: "0.7em" }} />
                                </Tooltip>
                                <Tooltip title="Archive">
                                    <ArchiveComponent archiveNoteId={key.id}
                                        arcUp={this.arcUp} />
                                </Tooltip>
                                <Tooltip title="More">
                                    <MoreOptionComponenent noteId={key.id}
                                        completeNote={key}
                                        deleteUp={this.deleteUp}
                                        moreOptionLabelProps={this.moreOptionLabel}
                                    />
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
                                            <ReminderComponent noteId={key.id}
                                                getUpdatedReminders={this.getUpdatedReminders}
                                            />
                                            <CollaboratorComponent noteToCollab={this.state.noteId}
                                                addCollab={this.addCollab}
                                                remCollab={this.remCollab} />
                                            <Tooltip title="Change color">
                                                <ColorPaletteComponent
                                                    paletteProps={this.handleColor}
                                                    notesId={this.state.noteId} />
                                            </Tooltip>
                                            <Tooltip title="Add image">
                                                <ImageOutlinedIcon style={{ height: "0.7em" }} />
                                            </Tooltip>
                                            <Tooltip title="Archive">
                                                <ArchiveComponent archiveNoteId={this.state.noteId}
                                                    arcUp={this.arcUp} />
                                            </Tooltip>
                                            <MoreOptionComponenent noteId={this.state.noteId}
                                                completeNote={key}
                                                deleteUp={this.deleteUp}
                                                moreOptionLabelProps={this.moreOptionLabel}
                                            />
                                            <Button onClick={() => this.handleUpdate(this.state.noteId, this.state.title, this.state.description, this.state.color)}>
                                                close
                                            </Button>
                                        </div>
                                    </DialogActions>
                                </Card>
                            </Dialog>
                        </MuiThemeProvider>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            // open={true}
                            open={this.state.openSnackBar}
                            autoHideDuration={6000}
                            onClose={this.snackbarClose}
                            message={<span id="messege-id">{this.state.SnackBarMessage}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    arial-label="close"
                                    color="inherit"
                                    onClick={this.snackbarClose}
                                >
                                    <ClearIcon onClick={this.snackbarClose} />
                                </IconButton>
                            ]}
                        />
                    </div >
                ))
        })
        return (
            this.state.count > 0 ?
                <div className={list} >
                    {allNotes}
                </div> :
                <div className="no-archive" >
                    <img src={require('../assets/images/notes.png')} width="80px" height="80px" />
                    Your archived notes appear here
                </div>
        )
    }
}
export default withRouter(GetArchiveComponent);