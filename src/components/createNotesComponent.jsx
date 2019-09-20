import React, { Component } from 'react'
import { Card, InputBase, Tooltip, Button } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { addNotes } from '../services/userService'
export default class createNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteClick: false,
            title: '',
            desc: ''
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
    render() {
        return (
            <div className="create-container">
                {this.state.noteClick ? (
                    <Card className="create-card2">
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
                                <Tooltip title="Change color">
                                    <ColorLensOutlinedIcon />
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
                            <div>
                                <Button onClick={this.handleClose}>
                                    close
                            </Button>
                            </div>
                        </div>
                    </Card>
                ) : (
                        <Card className="create-card1" onClick={this.handleNoteClick}>
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