import React, { Component } from 'react'
import { getAllNotes, updateNotes, colorChange } from '../services/userService'
import { Card, InputBase, Button, createMuiTheme, MuiThemeProvider, Chip, Divider } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ColorPaletteComponent from './colorPaletteComponent';
import ReminderComponent from './reminderComponent';
import CollaboratorComponent from '../components/collaboratorComponent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import MoreOptionComponenent from './moreOptionComponenent'
import DialogContent from '@material-ui/core/DialogContent';
import { deleteReminder } from '../services/userService';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { removeNoteLabel } from '../services/userService';
import { withRouter } from 'react-router-dom'
import ArchiveComponent from '../components/archiveComponent';
import Avatar from '@material-ui/core/Avatar';
const theme = createMuiTheme({
    overrides: {
        MuiBackdrop: {
            root: {
                backgroundColor: "rgba(0,0,0, 0.035)",
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
class GetAllNoteComponent extends Component {
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
            openSnackBar: false,
            SnackBarMessage: "",
            noteId: '',
            trashId: '',
            archiveId: '',
            completNotes: [],
            imageNotes: [],
            completeData: []
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
            try{
                var keyData;
            let newNote=this.state.notes.map(key=>{
                if(key.id===this.state.completNotes.id){
                    console.log("key in map",key);    
                    keyData=key
                    return key
                }
            })
            console.log("new note data is ",keyData);
            this.setState({
                completNotes:keyData
            })
             console.log("updated complete notes with reminder and lot more",this.state.completeNotes);

        }catch(err){
            console.log("eerr in get all notes",err);
            
        }
            // let c=0;
            // const imageNotes = this.state.notes.map(key => {
            //     if (key.isArchived === false
            //         && key.isDeleted === false) {
            //         return ++c
            //     }
            // })
            // console.log("const image notes is ", imageNotes);

            // this.setState({
            //     imageNotes: imageNotes
            // })
            // console.log("image notes in get all notes is ", this.state.imageNotes);

        })
    }

    updatedCard = (upCard) => {
        console.log("new card", upCard);
        this.setState({
            notes: [...this.state.notes, upCard]
        })
        console.log("new updated array is ", this.state.notes);
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
    handleUpdate = (id, oldTitle, oldDescription, colorUpdated, completKey) => {
        this.setState({
            noteId: id,
            title: oldTitle,
            description: oldDescription,
            open: !this.state.open,
            completNotes: completKey,
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
    deleteUp = (trashNoteId) => {
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
        this.setState({
            trashId: trashNoteId,
            openSnackBar: !this.state.openSnackBar,
            SnackBarMessage: "Note Deleted",
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
            SnackBarMessage: "Note archived"
        })
        console.log("noteid is in arcup", noteId);
        this.setState({
            archiveId: noteId,
            open: false
            // open: !this.state.open
        })
        this.getNotes();
    }
    handleLabelDelete = (noteId, labelId) => {
        console.log("delete chip");
        let data = {
            "labelId": labelId,
            "noteId": noteId
        }
        removeNoteLabel(data).then((res) => {
            console.log('response for remove notes label is', res)
            this.getNotes();
        }).catch((err) => {
            console.log('err in remove label is ', err);
        })
    }
    handleDeleteReminder = (id) => {
        let data = {
            "noteIdList": [id],
            "reminder": ""
        }
        console.log("data in delete reminder is", data);
        deleteReminder(data).then((res) => {
            //First way
            // console.log("response in deleting reminder is ", res);
            // console.log("notes is",this.state.notes);        
            // let newArr=this.state.notes;
            // for (let i = 0; i < newArr.length; i++) {
            //     if(newArr[i].id===id){
            //         console.log("new array id and id",newArr[i].id,id);
            //         newArr[i].reminder[0]='';
            //         break;
            //     }       
            // }
            // this.setState({
            //     notes:newArr
            // })
            //second way
            this.getNotes();
        }).catch((err) => {
            console.log("error in hitting delete reminder api", err);

        })
    }
    moreOptionLabel = (val) => {
        if (val) {
            this.getNotes();
        }
    }
    snackbarClose = () => {
        this.setState({
            openSnackBar: false
        })
    }
    getUpdatedReminders = (val) => {
        if (val) {
            this.getNotes();
        }
    }
    addCollab = (col) => {
        if (col) {
            this.getNotes();
        }
    }
    remCollab = (col) => {
        if (col) {
            this.getNotes();
        }
    }
    handleSQA = (fullNotes) => {
        console.log("this.props in get all notes sqa", this.props);
        this.state.completeData.push(fullNotes.id);
        this.state.completeData.push(fullNotes.title);
        this.state.completeData.push(fullNotes.description);
        this.state.completeData.push(true);
        let id = fullNotes.id
        this.props.history.push(`/quesAns/${id}`, this.state.completeData);
    }
    render() {
        const list = this.props.list ? "get-container1" : "get-container";
        const list1 = this.props.list ? "get-contents1" : "get-contents"
        const list2 = this.props.list ? "get-card1" : "get-card"
        console.log("props in getall notes is ", this.props.list);
        console.log("list is ", list);
        console.log('delup props in get note component', this.state.trashId);
        const allNotes = this.state.notes.slice(0).reverse().filter(titleDescSearch(this.props.searchText)).map((key, index) => {
            // console.log('keyid ', key.id);
            console.log("first character is ", key.user.firstName.charAt(0));
            return (
                (((key.isArchived === false)
                    && (key.isDeleted === false &&
                        key.id !== this.state.trashId &&
                        key.id !== this.state.archiveId))
                    &&
                    <div className={list1} key={index}>
                        <Card className={list2} style={{
                            backgroundColor: key.color,
                            borderRadius: "10px",
                            transform: (this.props.menu) ? "translate(80px,0) rotate(360deg)" : (null),
                            transition: (this.props.menu) ? ("300ms") : (null),
                            visibility: this.state.open && this.state.noteId === key.id ? 'hidden' : (null),
                            // transition:this.state.open && this.state.noteId === key.id?'5s':(null)
                        }}
                        >
                            <div className="input1">
                                <InputBase className="get-in2"
                                    multiline
                                    placeholder="Title"
                                    id="title"
                                    style={{ paddingLeft: "3%" }}
                                    onClick={() => this.handleUpdate(key.id, key.title, key.description, key.color, key)}
                                    value={key.title}
                                />
                            </div>
                            <div className="input2">
                                <InputBase className="get-in1"
                                    multiline
                                    id="description"
                                    style={{ paddingLeft: "3%" }}
                                    onClick={() => this.handleUpdate(key.id, key.title, key.description, key.color, key)}
                                    value={key.description}
                                />
                            </div>
                            <div className="get-chips">
                                {key.noteLabels.map(data => {
                                    return (
                                        <Chip onDelete={() => this.handleLabelDelete(key.id, data.id)}
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
                                {
                                    key.collaborators.map(col => {
                                        return (
                                            <Avatar style={{
                                                cursor: "pointer",
                                                width: "35px", height: "35px"
                                            }}>
                                                {col.firstName.toUpperCase().charAt(0)}
                                            </Avatar>
                                        )
                                    })
                                }
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
                                <MoreOptionComponenent noteId={this.state.noteId}
                                    completeNote={key}
                                    deleteUp={this.deleteUp}
                                    moreOptionLabelProps={this.moreOptionLabel}
                                />
                            </div>
                            <Divider />
                            <div>
                                {key.questionAndAnswerNotes.map(data => {
                                    return (
                                        <div className="get-questions">
                                            <p onClick={() => this.handleSQA(key)}>Question Asked</p>
                                            {data.message}
                                        </div>
                                    )
                                })}
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
                                                style={{ paddingLeft: "3%" }}
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
                                                style={{ paddingLeft: "3%" }}
                                                value={this.state.description}
                                                onChange={this.handleUpdateDescription}
                                            />
                                        </div>
                                        {
                                            this.state.completNotes !== undefined ?
                                                <div className="get-chips">
                                                    {(this.state.completNotes.noteLabels) ?
                                                        this.state.completNotes.noteLabels.map(data => {
                                                            return (
                                                                <Chip onDelete={() =>
                                                                    this.handleLabelDelete(this.state.completNotes.id, data.id)}
                                                                    label={data.label}>
                                                                </Chip>
                                                            );
                                                        }) : (null)
                                                    }
                                                    {
                                                        this.state.completNotes.reminder !== undefined ?
                                                            this.state.completNotes.reminder.map(data => {
                                                                return (
                                                                    <Chip onDelete={() =>
                                                                        this.handleDeleteReminder(this.state.completNotes.id)}
                                                                        icon={<AccessTimeIcon />}
                                                                        label={data.slice(0, 21)}
                                                                        size="medium">
                                                                    </Chip>
                                                                );
                                                            }) : (null)
                                                    }
                                                    {this.state.completNotes.collaborators !== undefined ?
                                                        this.state.completNotes.collaborators.map(col => {
                                                            return (
                                                                <Avatar style={{
                                                                    cursor: "pointer",
                                                                    width: "35px", height: "35px"
                                                                }}>
                                                                    {col.firstName.toUpperCase().charAt(0)}
                                                                </Avatar>
                                                            )
                                                        }) : (null)
                                                    }
                                                </div>
                                                : (null)
                                        }
                                    </DialogContent>
                                    <DialogActions>
                                        <div className="notes-icon-div2">
                                            <ReminderComponent noteId={this.state.noteId}
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
                                            <Button onClick={() => this.handleUpdate(this.state.noteId,
                                                this.state.title, this.state.description, this.state.color)}>
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
            <div className={list} >
                {allNotes}
            </div>
        )
    }
}
export default withRouter(GetAllNoteComponent)