import React, { Component } from 'react'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import { withRouter } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import { archive } from '../services/userService'
class ArchiveComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isArchived: false,
        }
    }
    handleArchive = () => {
        try {
            this.setState({
                isArchived: true,
                openSnackBar:!this.state.openSnackBar
            })
            var noteId = this.props.archiveNoteId;
            console.log("note id in archive", noteId);

            var data = {
                noteIdList: [noteId],
                isArchived: true
            }
            archive(data).then((res) => {
                this.props.arcUp(noteId)
                console.log('res in archive component', res);
            }).catch((err) => {
                console.log(err);
            })
        } catch (err) {
            console.log("err in archive component", err);
        }
    }
    handleUnArchive = () => {
        try {
            this.setState({
                isArchived: false
            })
            var noteId = this.props.archiveNoteId;
            console.log("note id in archive", noteId);

            var data = {
                noteIdList: [noteId],
                isArchived: false
            }
            archive(data).then((res) => {
                this.props.arcUp(noteId)
                console.log('res in archive component', res);
            }).catch((err) => {
                console.log(err);
            })
        } catch (err) {
            console.log("err in archive component", err);
        }
    }
    render() {
        return (
            <div>
                {
                    window.location.pathname === '/getArchive' ?
                        <Tooltip title="UnArchive">
                            <ArchiveOutlinedIcon onClick={this.handleUnArchive}
                                style={{ height: "0.7em" }}
                            />
                        </Tooltip >
                        :
                        <Tooltip title="Archive">
                            <ArchiveOutlinedIcon onClick={this.handleArchive}
                                style={{ height: "0.7em" }}
                            />
                        </Tooltip >
                }
            </div>
        )
    }
}
export default withRouter(ArchiveComponent)