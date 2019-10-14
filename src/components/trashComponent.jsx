import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { trash } from '../services/userService';
class TrashComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false,
            anchorEl: false,
        }
    }
    handleButton = () => {
        var trashNoteId = this.props.trashProps;
        var data = {
            noteIdList: [trashNoteId],
            isDeleted: true
        }
        console.log('data in trash', data);
        trash(data)
            .then((res) => {
                console.log('res in trash after hitting', res);
                this.props.delUp(trashNoteId)
            }).catch((err) => {
                console.log('error in trash ', err);
            })
    }

    handleCheck = () => {
        this.setState({
            check: !this.state.check
        })
    }
    render() {
        return (
            <div className="trash-del">
                <Button onClick={this.handleButton}>Delete</Button>
            </div>
        )
    }
}
export default withRouter(TrashComponent)