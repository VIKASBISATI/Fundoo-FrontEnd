import React, { Component } from 'react'
import { getAllNotes } from '../services/userService'
import { Card, InputBase } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ColorPaletteComponent from './colorPaletteComponent';
import colorChange from '../services/userService'
import Dialog from '@material-ui/core/Dialog';
import updateNotes from '../services/userService'
export default class GetAllNoteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            color: '',
            open: false,
            id:'',
            title:'',
            description:'',
            noteId:''
        }
    }
    componentWillMount() {
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

        colorChange(data).then((res) => {
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
    handleUpdate=(id,oldTitle,oldDescription)=>{
            this.setState({
                noteId:id,
                title:oldTitle,
                description:oldDescription,
                open:!this.state.open
            })
            var data={
                noteId:this.state.noteId,
                title:this.state.title,
                description:this.state.description
            }
            updateNotes(data).then((res)=>{
                this.getNotes();
                console.log('response in get notes is',res)
            }).catch((err)=>{
                console.log('err in get all notes update is ',err);    
            })
    }
    render() {
        const allNotes = this.state.notes.map((key) => {
            return (

                <div className="get-contents">
                    <Card className="get-card1" onClick={this.handleNoteClick} style={{ backgroundColor: key.color }}>
                        <div className="input1">
                            <InputBase className="get-in2"
                                multiline
                                placeholder="Title"
                                id="title"
                                onClick={() => this.handleUpdate(key.id, key.title, key.description)}
                                value={key.title}
                            />
                        </div>
                        <div className="input2">
                            <InputBase className="get-in1"
                                multiline
                                placeholder="Take a note ...."
                                id="description"
                                onClick={() => this.handleupdate(key.id, key.title, key.description)}
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
                    >
                       
                    </Dialog>
                </div>
            )
        })
        return (
            <div className="get-container">
                {allNotes}
            </div>
        )
    }
}