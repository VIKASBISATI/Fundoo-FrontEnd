import React, { Component } from 'react'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import { withRouter } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { archive } from '../services/userService'
class ArchiveComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isArchived: false,
            openSnackBar: false,
            SnackBarMessage: "",
        }
    }
    handleArchive = () => {
        this.setState({
            isArchived: true
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
    }
    render() {
        return (
            <div>
                <Tooltip title="Archive">
                    <ArchiveOutlinedIcon onClick={this.handleArchive}
                    />
                </Tooltip >
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
                            <ClearIcon />
                        </IconButton>
                    ]}
                />
            </div>
        )
    }
}
export default withRouter(ArchiveComponent)