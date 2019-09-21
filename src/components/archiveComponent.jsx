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
        const noteId = this.props.archiveNoteId;
        var data = {
            noteIdList: [noteId],
            isArchived: true
        }
        archive(data).then((res) => {
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