import React, { Component } from 'react'
import { Card, InputBase, Tooltip, Button } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { addNotes } from '../services/userService';
import ColorPaletteComponent from './colorPaletteComponent';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
export default class createNotes extends Component {
    intervalID;
    constructor(props) {
        super(props);
        this.state = {
            noteClick: false,
            title: '',
            desc: '',
            note: {}
        }
    }
    handleNoteClick = () => {
        this.setState({
            noteClick: true
        })
    }
    handleClose = () => {
        var data = {
            title: this.state.title,
            description: this.state.desc
        }
        console.log(data)
        addNotes(data).then((res) => {
            console.log(res);
            this.setState({
                note: res.data.status.details
            });
            this.props.getNew(this.state.note);
        }).catch((err) => {
            console.log(err);
        })
        this.setState({
            noteClick: false,
            title: '',
            desc: ''
        })
    }
    handleTitle = (e) => {
        var title = e.target.value;
        this.setState({
            title: title
        })
    }
    handleDescription = (e) => {
        var desc = e.target.value;
        this.setState({
            desc: desc
        })
    }
    // handleEnter=(e)=>{
    //     if(e.key==='Enter'){
    //         e.preventDefault();
    //         this.handleClose();
    //         onKeyPresss={()=>this.handleEnter}
    //     }
    // }
    render() {
        return (
            <div className="create-container">
                {this.state.noteClick ? (
                    <ClickAwayListener onClickAway={this.handleClose}>
                        <Card className="create-card2" style={{ boxShadow: "3px 3px 3px grey" }} >
                            <div className="input1">
                                <InputBase className="in2"
                                    multiline
                                    placeholder="Title"
                                    id="title"
                                    onChange={this.handleTitle}
                                    value={this.state.title}
                                />
                            </div>
                            <div className="input2">
                                <InputBase className="in3"
                                    multiline
                                    placeholder="Take a note ...."
                                    id="description"
                                    onChange={this.handleDescription}
                                    value={this.state.desc}
                                />
                            </div>
                            <div className="notes-icons">
                                <div className="notes-icon-div">
                                    <Tooltip title="Remind me">
                                        <AddAlertOutlinedIcon />
                                    </Tooltip>
                                    <Tooltip title="collaborator">
                                        <PersonAddOutlinedIcon />
                                    </Tooltip>
                                    <ColorPaletteComponent />
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
                                <div>
                                    <Button onClick={this.handleClose}>
                                        close
                            </Button>
                                </div>
                            </div>
                        </Card>
                    </ClickAwayListener>
                ) : (
                        <Card className="create-card1" onClick={this.handleNoteClick} style={{ boxShadow: "0.5px 0.5px 0.5px 0.5px grey" }}>
                            <div className="input2">
                                <InputBase className="in1"
                                    multiline
                                    placeholder="Take a note ...."
                                    id="description"
                                    onChange={this.handleDescription}
                                    value={this.state.desc}
                                />
                            </div>
                        </Card>
                    )
                }
            </div>
        )
    }
}