import React, { Component } from 'react'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import { withRouter } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import { archive } from '../services/userService'
class ArchiveComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isArchived: false
        }
    }
    handleArchive = () => {
        this.setState({
            isArchived: true
        })
        var noteId = this.props.archiveNoteId;
        console.log("note id in archive",noteId);
        
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
    }
    render() {
        return (
            <div>
                <Tooltip title="Archive">
                    <ArchiveOutlinedIcon onClick={this.handleArchive}
                    />
                </Tooltip >
            </div>
        )
    }
}
export default withRouter(ArchiveComponent)